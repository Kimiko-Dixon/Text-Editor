const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //Bundling HTML file
    plugins: [
      new HtmlWebpackPlugin({
        template:"./index.html",
        title:"Text Editor"
      }),
      //Bundling Service worker
      new InjectManifest({
        swSrc:'./src-sw.js',
        swDest:'src-sw.js'
      }),
      //PWA settings
      new WebpackPwaManifest({
        //Fingerprints and inject from TA
        fingerprints:false,
        inject:true,
        name:'Just Another Text Editor',
        short_name:'J.A.T.E',
        background_color:'#225ca3',
        theme_color:'#225ca3',
        start_url:'./',
        publicPath:'./',
        icons: [
          {
            src:path.resolve('src/images/logo.png'),
            sizes:[96,128,192,256,384,512],
            destination: path.join('assets','icons')
          }
        ]
      })
    ],
    // Adds CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test:/\.css$/i,
          use:['style-loader','css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude:/node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env'],
              plugins:['@babel/plugin-proposal-object-rest-spread','@babel/plugin-transform-runtime']
            }
          }
        }
      ],
    },
  };
};
