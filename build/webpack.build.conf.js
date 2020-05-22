const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
//const FileManagerPlugin = require("filemanager-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
})

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
