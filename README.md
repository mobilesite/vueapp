This project will show you how to build a web app with vue.js 2.0 step by step, taking webpack 2.0 as the packing tool.

The technology stack will be used is:

- webpack 2.2
- Vue.js 2
- Vue-router
- Vuex
- Normalize.css
- LESS
- PostCSS
- ECMAScript 2015
- Babel
- Element-UI
- JSDoc
- ESLint
- Zepto
- mocha
- chai
- Istanbul

## Installation && Usage

1. Add the host to your hosts list:

```
127.0.0.1	localhost
```

2. Change to the project direct and install dependencies

```
$ npm install
```

## Command

```
npm run dev
npm run build
```
## License

MIT

## 其它

### 在windows系统`npm install`时出现如下错误：

1、upm update ERR! stack Error: Can't find Python executable "C:\Python\Python36\python.exe", you can set the PYTHON env variable.

这是需要安装Python，而且其版本必须是2(推荐安装2.7版本)，而不能是3。并把Python的安装目录（如C:\Python27）加入到系统环境变量Path中。

2、“D:\vueapp\node_modules\node-sass\build\binding.sln”(默认目标) (1) ->
  (_src_\libsass 目标) ->
    MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”。要解决此问题，1) 安装 .NET Framework 2.0 SDK；2) 安装 Microsoft Visual Studio 2005；或 3) 如果将该组件安装到了其他位置，请将其位置添加到系统路径中。 [D:\h5app\no
  de_modules\node-sass\build\binding.sln]

这需要 Install Visual C++ Build Tools using the Default Install option.

然后Launch cmd, npm config set msvs_version 2015

详见：https://github.com/nodejs/node-gyp

