const webpack = require('atool-build/lib/webpack');
const pxtorem = require('postcss-pxtorem');

module.exports = function(webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime');
  // Support AntDesign Mobile CSS
  webpackConfig.babel.plugins.push(['import', {
    style: true,
    libraryDirectory: 'lib',
    libraryName: 'antd-mobile',
  }]);
  webpackConfig.postcss.push(pxtorem({
    rootValue: 100,
    propWhiteList: [],
  }));

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });
  //配置各种全局环境变量
  var define = {
    "default": {
      "HOST": "http://swimming.51yundong.me", //http://192.168.2.176:8093
      "LOGIN": "http://auth.51yundong.me",
      "FDFS": "http://dd.51yundong.me/v3",
      "FACE": "http://face.51yundong.me/v3",
      "DEBUG": true
    },
    "development": {
      "HOST": "http://swim.yudingnet.com",
      "LOGIN": "http://auth.yudingnet.com",
      "FDFS": "http://dd.yudingnet.com/v3",
      "FACE": "http://face.yudingnet.com/v3",
      "DEBUG": true
    },
    "production": {
      "HOST": "http://swimming.51yundong.me",
      "LOGIN": "http://auth.51yundong.me",
      "FDFS": "http://dd.51yundong.me/v3",
      "FACE": "http://face.51yundong.me/v3",
      "DEBUG": false
    }
  };
  var definePluginOptionKey = define[process.env.NODE_ENV] ? process.env.NODE_ENV : define['default'] ? 'default' : '';
  if(definePluginOptionKey){
    var defineContent = define[definePluginOptionKey];
    if (typeof defineContent === 'object') {
      for (var i in defineContent) {
        (typeof(defineContent[i]) === 'string' || typeof(defineContent[i] === 'object')) && (defineContent[i] = JSON.stringify(defineContent[i]));
      }
    }
    webpackConfig.plugins.push(
      new webpack.DefinePlugin(defineContent)
    )
  }
  console.info('NODE_ENV is', definePluginOptionKey);
  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  // const resolve = {
  //   modulesDirectories: ['node_modules', require('path').join(__dirname, '../node_modules')],
  //     extensions: ['', '.web.js', '.js', '.json'],
  // }
  // webpackConfig.resolve = resolve;

  return webpackConfig;
};
