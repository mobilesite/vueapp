/**
 *
 * @author dennis
 * @email
 * @since  17/1/15
 */
var glob = require('glob');
var path = require('path');

var resolvePath = path.resolve;
var joinPath = path.join;
var rootPath = resolvePath(__dirname, '../');

var configs = {
    srcPath: 'src',
    distPath: 'dist',
    publicPath: '/',
    eslintConfigPath: './.eslintrc.js',
    postcssConfigPath: 'config/postcss.config.js',
    jsdocConfigPath: './jsdoc.conf',
    excludeReg: /(node_modules)|(bower_components)/,
    globalLib: 'globalLib',
    alias: {
        //注意：这里配置的路径应该是相对于srcPath的相对路径
        base: resolvePath(rootPath, 'src/base/'),
        libs: resolvePath(rootPath, 'src/base/libs'),
        normal: resolvePath(rootPath, 'src/components-normal'),
        business: resolvePath(rootPath, 'src/components-business'),
        pages: resolvePath(rootPath, 'src/pages'),
        filters: resolvePath(rootPath, 'src/filters'),
        directives:  resolvePath(rootPath, 'src/directives'),
        plugins:  resolvePath(rootPath, 'src/plugins'),
        utils:  resolvePath(rootPath, 'src/utils'),
        mixins:  resolvePath(rootPath, 'src/mixins'),
        vue: 'vue/dist/vue.js',
        ext: resolvePath(rootPath, 'src/base/vue.ext.js'),
        'vue-router': 'vue-router/dist/vue-router.js'
    }
};

var srcPath = resolvePath(rootPath, configs.srcPath);
var distPath = resolvePath(rootPath, configs.distPath);
var eslintConfigPath = resolvePath(rootPath, configs.eslintConfigPath);
var postcssConfigPath = resolvePath(rootPath, configs.postcssConfigPath);
var jsdocConfigPath = resolvePath(rootPath, configs.jsdocConfigPath);

var publicPath = configs.publicPath;

var globalLib = configs.globalLib;

var excludeReg = configs.excludeReg;

var alias = configs.alias;

var filePath = [];
var globInstance = [];
var globArr = [
    {
        name: 'page',
        filename: 'page'
    },
    {
        name: 'filter',
        filename: 'filter'
    },
    {
        name: 'directive',
        filename: 'directive'
    },
    {
        name: 'util',
        filename: 'util'
    }
];
var exportObj = {
    //工具方法
    path,
    resolvePath,
    joinPath,
    //几个路径
    rootPath,
    srcPath,
    distPath,
    eslintConfigPath,
    //postcss配置文件路径
    postcssConfigPath,
    jsdocConfigPath,
    //publicPath
    publicPath,
    //抛出的全局方法被挂载到的全局变量
    globalLib,
    //正则
    excludeReg,
    //别名定义
    alias
};

globArr.forEach((item, index) => {
    filePath[item.name] = alias[item.name + 's'];
    globInstance[item.name] = new glob.Glob('**/' + item.filename + '.js', {
        cwd: filePath[item.name],
        sync: true  // 这里不能异步，只能同步
    });

    exportObj[item.name + 'Entries'] = {};

    globInstance[item.name].found.forEach((newItem) => {
        exportObj[item.name + 'Entries'][newItem.replace(new RegExp('\/' + item.filename + '\.js'), '')] = resolvePath(filePath[item.name], newItem);
    });
});

// 改成上面的数组循环执行之前的代码
// var pagePath = alias.pages;
// globInstance = new glob.Glob('**/page.js', {
//     cwd: pagePath,
//     sync: true  // 这里不能异步，只能同步
// });
// var pageEntries = {};
// globInstance.found.forEach((item) => {
//     pageEntries[item.replace(/\/page\.js/, '')] = resolvePath(pagePath, item);
// });
// exportObj.pageEntries = pageEntries;

module.exports = exportObj;
