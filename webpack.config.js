require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isDev = process.env.APP_ENV === "development";

// TODO: resolve Live reload browser feature

console.log(process.env.APP_ENV);

const output_path = isDev
  ? path.resolve(__dirname, "dist")
  : path.resolve(__dirname, "public");

const extractCSS = new ExtractTextPlugin({
  filename: "css/[name].css"
});

module.exports = {
  context: path.resolve(__dirname),

  entry: {
    main: "./src/js/index"
  },

  output: {
    path: output_path,
    publicPath: "dist",
    filename: "js/[name].js"
  },

  devtool: isDev ? "cheap-inline-module-source-map" : "source-map",

  devServer: {
    contentBase: "./dist",
    watchContentBase: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: "css-loader"
         })
      }
    ],
  },

  resolve: {
    alias: {
      jquery: path.resolve(__dirname, "./node_modules/jquery/dist/jquery.js"),
      bootstrap_css: path.resolve(
        __dirname,
        "./node_modules/bootstrap/dist/css/bootstrap.css"
      ),
      bootstrap_js: path.resolve(
        __dirname,
        "./node_modules/bootstrap/dist/js/bootstrap.js"
      ),
      popper_js: path.resolve(
        __dirname,
        "./node_modules/popper.js/dist/popper.js"
      )
    },
    extensions: [".js", ".jsx", ".json", ".css", ".scss"]
  },

  plugins: [extractCSS]
};
