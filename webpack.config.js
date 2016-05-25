var webpack = require('webpack');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const devToolSetting = isProduction ? 'source-map' : 'cheap-module-eval-source-map';

const GLOBALS = isProduction ? {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
} : {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};


const PLUGINS = isProduction ? [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin(GLOBALS),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
] : [
  new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];


module.exports = {
  debug: !isProduction,

  devtool: devToolSetting,

  noInfo: true, // set to false to see a list of every file being bundled.

  entry: ['./src/index'],

  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test

  output: {
    path: path.join(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    filename: 'bundle.js'
  },

  plugins: PLUGINS,

  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']}
    ]
  }

};
