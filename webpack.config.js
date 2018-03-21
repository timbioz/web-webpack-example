require("dotenv").config();
const path = require("path");
const chalk = require('chalk');
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// region Options

const isDev = process.env.APP_ENV === "development";
const isClean = process.env.CLEAN_FOLDERS === "true" || false;

console.log(chalk.red(process.env.APP_ENV));

const output_path = isDev
    ? path.resolve(__dirname, "build")
    : path.resolve(__dirname, "dist");

// endregion

module.exports = {
    context: path.resolve(__dirname),

    mode: isDev ? "development" : "production",

    entry: {
        main: "./src/js/index"
    },

    output: {
        path: output_path,
        publicPath: "/",
        filename: "js/[name].js"
    },
    
    devtool: isDev ? "inline-source-map" : "source-map",

    devServer: {
        contentBase: "./build",
        watchContentBase: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|dist|build)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.scss$/, /\.css$/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: isDev ? false : true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                  }
            },
            {
                test: /\.(pdf|jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8000,
                            name: "images/[hash]-[name].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8000,
                            name: "images/[hash]-[name].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {}
                    }
                ]
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
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin({
            title: "My App timbioz",
            filename: "index.html",
            template: "src/views/index.html",
            hash: true,
            minify: {
                html5: true
            }
        })
    ]
};

if (isClean) {
    console.log(chalk.green("Clean webpack plugin added(pushed)"));
    module.exports.plugins.push(
        new CleanWebpackPlugin(["build", "dist"])
);
}
