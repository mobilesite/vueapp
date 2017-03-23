/**
 * @author: dennis
 * @email:
 * @since:  2017-1-20
 */

'use strict';

var options = require('./webpack.config.options');

var webpack = require('webpack');

var HTMLWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var resolvePath = path.resolve;
var rootPath = resolvePath('../');
var srcPath = resolvePath(rootPath, options.srcPath);
var distPath = resolvePath(rootPath, options.distPath);
var postcssConfigPath = options.postcssConfigPath;
var baseConfig = require('./webpack.config.base.js');

var pagePath = options.alias.pages;
var pageEntries = options.pageEntries;
var publicPath = options.publicPath;
var globalLib = options.globalLib;
// var excludeReg = options.excludeReg;

var plugins = [
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
    filename: 'js/[name].js', //这里的[name]就是上一行定义的name参数的值
    minChunks: 3,
    // chunks: ['main'] //指明提取哪些chunk的公共部分，默认会提取所有chunk的公共部分
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      devServer: {
        contentBase: './dist/', //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
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
   * 自动加载模块。
   * 语法：new webpack.ProvidePlugin({identifier1: 'module1',...})
   * 任何时候，当 identifier 被当作未赋值的变量时， module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值。
   */
  new webpack.ProvidePlugin({
    $: 'zepto'
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
    hash: false // 为静态资源生成hash值
  });
  plugins.push(htmlPlugin);
});

var result = Object.assign(
  { },
  baseConfig,
  {
    //使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项。
    devtool: 'eval-source-map',
    /**
     * 由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 最常用于（但不限于）在打包模块的“compilation”和“chunk”生命周期执行操作和自定义功能
     * 由于需要在一个配置中，多次使用一个插件，来针对不同的目的，因此你需要使用 new 来创建插件的实例，并且通过实例来调用插件。
     */
    plugins: plugins
  }
);

result.output = {
    path: distPath,
    filename: 'js/[name].bundle.js', //注意这里需要加引号，否则会报filename: [name].js   ReferenceError: name is not defined的错误
    chunkFilename: 'js/[name].js',  //这个与异步加载的模块有关，即require.ensure(['./a'],function(require){var aModule = require('./a');},'tips');声明的模块。这样的话会产生一个tips.[chunkhash:8].js的chunk文件，且是异步加载的
    publicPath: publicPath, //publicPath影响着单独作为css文件输出的css中对于图片的引用路径
    library: globalLib, //这将会把globalLib导出到window上，可以通过window.globalLib进行访问
};

result.module.rules.push(
    /**
     * 处理css（处理之后会通过postcss进行进一步处理，这里配置了autoprefixer插件来进行处理）
     */
    {
        test: /\.css$/,
        // include: srcPath,
        use: [
            'style-loader',
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
        ],
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
        // include: srcPath,
        use: [
            {
                loader: 'style-loader'
            },
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
        ], //使用less-loader的时候得同时安装less模块，否则会报出错误：Module build failed: Error: Cannot find module 'less'。less-loader需要依赖less才能实现。因为npm3.0+中less是不会随着less-loader自动安装的。
        // exclude: excludeReg
    }
);

result.module.rules.push(
    /**
     * 处理sass文件
     */
    {
        test: /\.(scss|sass)$/,
        // include: srcPath,
        use: [
            {
                loader: 'style-loader'
            },
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
        ],
        // exclude: excludeReg
    }
);

module.exports = result;
