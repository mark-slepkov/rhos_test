/**
 * Created by mark on 9/14/16.
 */
var path = require("path");
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
    display_modules: true,
    entry: './src/init',
    output: {
        path: './dist/',
        publicPath: '/',
        filename: 'build.js',
        library: 'jquery'
    },
    resolve: {
        modulesDirectories: ['bower_components','src/', '', './'],
        extensions: ['.js', '.coffee', ''],
        alias: {
            marionette: 'backbone.marionette'
        }
    },
    module: {
        loaders: [
            {test: /\.sass$/, loader: 'style!css!sass'},
            {test: /\.css$/, loader: 'style!css'},

            {test: /\.html$/, loader: 'html'},
            {
                test: /\.(png|jpg|svg|ttf|otf|eot|woff|woff2)$/,
                loader: 'file-loader?name=static/[hash].[ext]'
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({
        //    warnings: false,
        //    drop_console: true,
        //    unsafe: true
        //}),
        //new webpack.ResolverPlugin([
        //            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        //        ],
        //        ["normal", "loader"]
        //),
        new BowerWebpackPlugin({
			modulesDirectories: ['bower_components'],
			manifestFiles: ['bower.json'],
			includes: /.*/,
			excludes: [],
            searchResolveModulesDirectories: true
		})
        //new ExtractTextPlugin('index.css')
    ]
};