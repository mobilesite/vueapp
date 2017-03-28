/**
 * @author: dennis
 * @email:
 * @since:  2017-1-20
 */

'use strict';

var options = require('./webpack.config.options');

var webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');//注意，在使用web-dev-server的时候，不要使用extract-text-webpack-plugin，目前不支持。参见：https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/384
var HTMLWebpackPlugin = require('html-webpack-plugin');
var JsDocPlugin = require('jsdoc-webpack-plugin-v2');

var path = require('path');
var resolvePath = path.resolve;
var rootPath = resolvePath('../');
var srcPath = resolvePath(rootPath, options.srcPath);
var distPath = resolvePath(rootPath, options.distPath);
var baseConfig = require('./webpack.config.base.js');
var postcssConfigPath = options.postcssConfigPath;
var jsdocConfigPath = options.jsdocConfigPath;

var pagePath = options.alias.pages;
var pageEntries = options.pageEntries;
var excludeReg = options.excludeReg;

var plugins = [
    /**
     * 清理build目录
     */
    new CleanWebpackPlugin(baseConfig.output.path, {
        root: rootPath, //这个配置项不能缺少，否则会出现如下提示，并且clean操作被跳过：clean-webpack-plugin: ...\build is outside of the project root. Skipping...
        verbose: true //verbose冗长的，啰嗦的。表示Write logs to console.
    }),
    /**
     * 提取公共js文件打成公用包
     *
     * if you have any modules that get loaded 2 or more times (set by minChunks parameter),
     * it will bundle that into a commons.js file which you can then cache on the client side.
     *
     * 注意：如果使用CommonsChunkPlugin生成了公共文件，但是在页面中却没有引入CommonsChunkPlugin生成的公共文件或者引入这个公共文件的位置不在其它用webpack打包的JS文件的前面，在浏览页面时就会出现”Uncaught ReferenceError: webpackJsonp is not defined”的报错。
     *
     * /**
     * 关于hash、chunkhash的区分 http://www.cnblogs.com/ihardcoder/p/5623411.html
     * chunkhash是随着某一特定chunk的内容变化而变化，即根据某个特定chunk的内容计算出的hash值。webpack计算chunkhash时，根据入口文件(entry)不同而分别计算，当chunk中有一部分内容变化时（不管是js还是css），就会重新计算chunkhash。webpack使用NodeJS内置的crypto模块计算chunkhash。每个chunk资源会生成与其内容相关的chunkhash。
     *
     * hash是随着compilation进行而产生，而在项目中任何一个文件改动后都会创建新的compilation，相应的hash值也就会更新。hash可以理解为项目总体文件的hash值，而不是针对每个具体chunk的。即它是受到所有chunks影响的hash。每次编译生成一个唯一hash，但所有资源全打上同一个 hash，无法完成持久化缓存的需求。
     *
     * 有人说，热更新模式下，将hash改成chunkhash后，vendors文件会变成undefined，试了很多种传参格式，依然无法达到目的。
     最后发现只是在webpack热更新模式下才会如此，又因为开发环境可以忽略版本控制，所以拆分两个环境下的配置解决此问题。
     *
     * 不要在开发环境使用 [chunkhash]/[hash]/[contenthash]，因为不需要在开发环境做持久缓存，而且这样会增加编译时间，开发环境用 [name] 就可以了
     *
     */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/[name].[chunkhash:8].js', //这里的[name]就是上一行定义的name参数的值
        minChunks: 3,
        // chunks: ['main'] //指明提取哪些chunk的公共部分，默认会提取所有chunk的公共部分
    }),
    /**
     * 提取公共样式文件打成公用包
     *
     * 特别要注意，如果webpack的多个配置文件中，后一个配置文件将前一个的plugins选项覆盖掉了，或者plugins选项被错误地放置到了module下面，将会报如下错，很难排查：Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin 参见：https://github.com/webpack/extract-text-webpack-plugin/issues/50
     *
     * extract-text-webpack-plugin提供了另外一种hash值：contenthash。顾名思义，contenthash代表的是文本文件内容的hash值，也就是只有style文件的hash值
     */
    new ExtractTextWebpackPlugin({
        filename: 'css/[name].[contenthash].css',
        allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            devServer: {
                contentBase: distPath, //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
                port: 80,
                inline: true, //当源文件改变时会自动刷新页面，而且当URL改变时，会在浏览器地址栏体现出来。除了inline mode之外，webpack-dev-server还支持另外一种自动刷新页面的方式，叫做iframe mode，它是将页面嵌入到一个iframe中，源文件更改时，刷新的是iframe，URL地址的改变不会反应到浏览器地址栏中。
                compress: true, //一切服务都启用gzip 压缩
                hot: true, //热启动
                colors: true, //使终端输出的内容为彩色的
                historyApiFallback: false,//当为true时，当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
                proxy: {
                    'http://dev.test.com/api/*': {
                        target: 'http://localhost/api',
                        secure: false
                    }
                }
            }
        }
    }),
    /**
     * 文档生成
     */
    new JsDocPlugin({
        conf: jsdocConfigPath
    }),
    /**
     * 压缩代码
     *
     * It's unused and dead_code option that enable tree shaking.
     *
     * 注意，当前版本的UglifyJsPlugin在打包时会存在如下问题：
     * ERROR in build.js from UglifyJsSyntaxError:
     * Unexpected token punc «(», expected punc «:»
     * 原因在于这个插件依赖了uglify-js，但是当前版本的uglify-js是不支持ES6代码的压缩的，解决的办法是
     * 在package.json的devDependencies中加入如下依赖，然后重新执行一遍npm install
     * "uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony"
     * 参见：https://github.com/webpack-contrib/uglifyjs-webpack-plugin
     */
    new webpack.optimize.UglifyJsPlugin({
        mangle: { // 排除不想要压缩的对象名称
            except: ['$', 'exports', 'require', 'module']
        },
        compress: {
            // http://lisperator.net/uglifyjs/compress
            warnings: false,    // warn about potentially dangerous optimizations/code
            conditionals: true, // optimize if-s and conditional expressions
            unused: true,       // drop unused variables/functions
            comparisons: true,  // optimize comparisons
            sequences: true,    // join consecutive statements with the "comma operato"
            dead_code: true,    // discard unreachable code 丢弃未使用的代码
            evaluate: true,     // evaluate constant expressions
            join_vars: true,    // join var declarations
            if_return: true     // optimize if-s followed by return/continue
        },
        output: {
            // https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
            comments: false
        },
        sourceMap: true         //将错误信息的位置映射到模块。这会减慢编译的速度。仅在开发环境下使用。
    }),
    /**
     * 生成稳定的模块ID
     */
    new webpack.HashedModuleIdsPlugin(),
    /**
     * 允许你创建一个在编译时可以配置的全局常量
     */
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('dev')
        }
    }),
    /**
     * 自动加载模块。
     * 语法：new webpack.ProvidePlugin({identifier1: 'module1',...})
     * 任何时候，当 identifier 被当作未赋值的变量时， module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值。
     */
    new webpack.ProvidePlugin({
        $: 'zepto',
        'Zepto': 'zepto',
        'window.Zepto': 'zepto', //??
        'window.$': 'zepto'
    })
];

Object.keys(pageEntries).map((item) => {
    /**
     * 将抽取好的js和css公用文件插入到html页面中
     */
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${item}.html`,
        template: resolvePath(pagePath, `./${item}/page.html`),
        chunks: ['common', item], //指定包含哪些chunk(含JS和CSS)，不指定的话，它会包含打包后输出的所有chunk
        hash: true, // 为静态资源生成hash值
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    });
    plugins.push(htmlPlugin);
});

var result = Object.assign(
    {},
    baseConfig,
    {
        //http://cheng.logdown.com/posts/2016/03/25/679045
        // devtool: 'cheap-module-source-map',
        /**
         * 由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 最常用于（但不限于）在打包模块的“compilation”和“chunk”生命周期执行操作和自定义功能
         * 由于需要在一个配置中，多次使用一个插件，来针对不同的目的，因此你需要使用 new 来创建插件的实例，并且通过实例来调用插件。
         */
        plugins: plugins
    }
);

result.output = Object.assign(baseConfig.output, {
    filename: 'js/[name].[chunkhash:8].bundle.js', //注意这里需要加引号，否则会报filename: [name].js   ReferenceError: name is not defined的错误
    chunkFilename: 'js/[name].[chunkhash:8].js',  //这个与异步加载的模块有关，即require.ensure(['./a'],function(require){var aModule = require('./a');},'tips');声明的模块。这样的话会产生一个tips.[chunkhash:8].js的chunk文件，且是异步加载的
});

result.module.rules.push(
    /**
     * 处理css（处理之后会通过postcss进行进一步处理，这里配置了autoprefixer插件来进行处理）
     */
    {
        test: /\.css$/,
        // include: srcPath,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            loader: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMaps: true,
                        modules: true,
                        importLoaders: 1, //??
                        // localIdentName: '[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: { //这里暂时只能用query，不能用options，否则会报错：Module build failed: ModuleBuildError: Module build failed: Error: No PostCSS Config found in: h5app\src
                        config: postcssConfigPath
                    }
                }
            ]
        }),
        // exclude: excludeReg
    }
);

result.module.rules.push(
    /**
     * 处理less
     *
     * 使用less-loader的时候得同时安装less模块，否则会报出错误：Module build failed: Error: Cannot find module 'less'。less-loader需要依赖less才能实现。因为npm3.0+中less是不会随着less-loader自动安装的。
     */
    {
        test: /\.less$/,
        include: srcPath,
        use: ExtractTextWebpackPlugin.extract({ //注意此处别落了.extract
            fallback: 'style-loader',
            loader: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        importLoaders: 1,
                        // localIdentName: '[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        config: postcssConfigPath
                    }
                },
                {
                    loader: 'less-loader'
                }
            ]
        }),
        exclude: excludeReg
    }
);

result.module.rules.push(
    /**
     * 处理sass文件
     */
    {
        test: /\.(scss|sass)$/,
        // include: srcPath,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            loader: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        importLoaders: 1,
                        // localIdentName: '[hash:base64:5]'  //加上此选项后，classname将会转换成
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        config: postcssConfigPath
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        // exclude: excludeReg
    }
);

module.exports = result;
