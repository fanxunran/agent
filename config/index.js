'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const devConfig = {
  newCookie:''
};
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //代理配置
      '/dmp': {  //代理地址
        target: 'http://dmp.manage.wakedata.com',  //需要代理的地址
        changeOrigin: true,  //是否跨域
        secure: true,

      },
      '/c': {  //代理地址
        target: 'https://www.wakedata.com',  //需要代理的地址
        changeOrigin: true,  //是否跨域
        secure: true,
        // 修改cookie path
        onProxyRes(proxyRes, req, res) {
          const cookies = proxyRes.headers['set-cookie'];
          if (cookies) {
            console.log('cookies', cookies);
            const newCookie = cookies.map(function(cookie) {
              return cookie.replace(/Domain=.wakedata.com/i, 'Domain=wakedata.com');
            });
            delete proxyRes.headers['set-cookie'];
            devConfig.newCookie = newCookie;
            proxyRes.headers['set-cookie'] = newCookie;
          }
        }
      }
    },

    // Various Dev Server settings
    // host: 'dmp.manage.wakedata.com', // can be overwritten by process.env.HOST
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
