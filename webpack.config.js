var webpack = require('webpack')
var path=require('path')
module.exports={
  entry: __dirname+"/src/main.js",
  module:{
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['stage-0'],
      }
    }]
  },
  output: {
    path: __dirname + "/src",
    filename:"bundle.js"
  }
}
