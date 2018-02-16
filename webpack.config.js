require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// region Options

const isDev = process.env.APP_ENV === "development";

console.log(process.env.APP_ENV);

const output_path = isDev
    ? path.resolve(__dirname, "build")
    : path.resolve(__dirname, "dist");

const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css"
});

// endregion

module.exports = {
    context: path.resolve(__dirname),

    entry: {
        main: "./src/js/index"
    },

    output: {
        path: output_path,
        //publicPath: "dist",
        filename: "js/[name].js"
    },

    devtool: isDev ? "cheap-inline-module-source-map" : "source-map",

    // TODO: delete devserver after BrowserSync will be fully tested
    devServer: {
        contentBase: "./dist",
        watchContentBase: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|dist|build)/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractCss.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    resolve: {
        alias: {
            jquery: path.resolve(
                __dirname,
                "./node_modules/jquery/dist/jquery.js"
            ),
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

    plugins: [
        new CleanWebpackPlugin(["build", "dist"]),
        extractCss,
        new CopyWebpackPlugin([
            {
                from: "src/views"
            }
        ])
    ]
};
