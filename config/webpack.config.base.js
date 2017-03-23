/**
 * @author: dennis
 * @email:
 * @since:  2017-1-20
 */

'use strict';

var options = require('./webpack.config.options');

var webpack = require('webpack');

var path = options.path;
var joinPath = options.joinPath;
var rootPath = options.rootPath;
var srcPath = options.srcPath;
var distPath = options.distPath;
var publicPath = options.publicPath;
var excludeReg = options.excludeReg;
var globalLib = options.globalLib;
var alias = options.alias;

var pageEntries = options.pageEntries;

module.exports = {
    // context: srcPath,
    /**
     * 入口文件
     *
     * webpack 将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并遵循着依赖关系图表知道要打包什么。
     *
     * vendor: __dirname + '/src/index.js' //在Mac下这么写没问题，但是，在Windows下，这么写会报错：ERROR in Entry module not found: Error: Can't resolve 'E:\h5app\config/src/index.js' in 'E:\h5app'
     */
    entry: pageEntries,
    output: {
        path: distPath,
        publicPath: publicPath, //publicPath影响着单独作为css文件输出的css中对于图片的引用路径
        library: globalLib, //这将会把globalLib导出到window上，可以通过window.globalLib进行访问
    },

    /**
     * webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。而且 webpack 只理解 JavaScript。webpack loader 会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中。
     */
    module: {
        rules: [
            /**
             * 处理html
             */
            {
                test: /\.(html|htm)$/,
                include: srcPath,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            /**
             * 处理js、es6、jsx文件（处理之前会通过eslint进行检查）
             */
            {
                test: /\.(js|es|es6|jsx)$/,
                // include: srcPath,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                /*
                                 * 1. babel 6中，这里一定要包这层[]，否则会报错：
                                 * Using removed Babel 5 option: foreign.modules -
                                 * Use the corresponding module transform plugin in the `plugins` option
                                 * 2.modules: false tells the es2015 preset to avoid compiling import
                                 * statements into CommonJS.
                                 * That lets Webpack do tree shaking on your code.
                                 * */
                                ['es2015', {modules: false, loose: true}],
                                ['react']
                            ],
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: joinPath(rootPath, '.eslintrc')
                        }
                    }
                ],
                exclude: excludeReg
            },
            {
                test: /\.vue$/,
                // include: srcPath,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            /**
             * 处理图片文件
             */
            {
                test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/i,
                // include: srcPath,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, //小于5000B的图片文件转成base64嵌入到css里
                            name: 'imgs/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            /**
             * 处理字体文件
             */
            {
                test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
                // include: srcPath,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 10000, //小于5000B的图片文件转成base64嵌入到css里
                            name: '/fonts/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            /**
             * 处理未模块化的库，如 Zepto
             *
             * 详见：https://juejin.im/entry/588ca3018d6d81006c237c85
             */
            {
                test: require.resolve('zepto'), //require.resolve() 是 nodejs 用来查找模块位置的方法，返回模块的入口文件，如 zepto 为 ./node_modules/zepto/dist/zepto.js。
                loader: 'exports-loader?window.Zepto!script-loader'
            }
        ]
    },
    /**
     * 想在项目中require一些其它的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，就可以配置在这里，然后就可以在页面中使用这些API了，如var Zepto = require(“zepto”);
     */
    // externals: {
    //   'zepto': 'Zepto'
    // },
    resolve: {
        modules: [srcPath, 'node_modules'],
        extensions: ['.js', '.jsx', '.es', '.es6', '.coffee', '.json', '.css', '.vue', '.less'],
        alias: alias
    }
}
