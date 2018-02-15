var path = require('path');


const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

const output_path = NODE_ENV === 'production' ?
    (__dirname + '/public/js'):
    (__dirname + '/resources/assets/js');

    console.log(process.env.NODE_ENV);
    console.log(NODE_ENV);
    console.log(__dirname);

module.exports = {
    context: path.resolve(__dirname),

    entry: {
        main: './src/js/index'
    },

    output: {
        path: output_path,
        filename: '[name].js'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,

    resolve : {
        alias: {
          "jquery-ui": "jquery-ui-dist/jquery-ui.js"
        },
        extensions: ['.js', '.jsx', '.json', '*']
    },

    module: {
        rules: [
            {
                test: [
                    /\.jsx?$/
                ],
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }
};