require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const isDev = process.env.APP_ENV === 'development';

console.log(process.env.APP_ENV);
console.log(isDev);

const output_path = isDev ? path.resolve(__dirname, "/dist/js") : path.resolve(__dirname, "/public/js");

module.exports = {
  context: path.resolve(__dirname),

  entry: {
    main: "./src/js/index"
  },

  output: {
    path: output_path,
    filename: "[name].js"
  },

  devtool: isDev ? "cheap-inline-module-source-map" : "source-map",

  resolve: {
    alias: {
      jquery: path.resolve(__dirname, "./node_modules/jquery/dist/jquery.js"),
      bootstrap_css: path.resolve(__dirname, "./node_modules/bootstrap/dist/css/bootstrap.css"),
      bootstrap_js: path.resolve(__dirname, "./node_modules/bootstrap/dist/js/bootstrap.js"),
      popper_js: path.resolve(__dirname, "./node_modules/popper.js/dist/popper.js")
    },
    extensions: [".js", ".jsx", ".json", ".css", ".scss"]
  },

  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};