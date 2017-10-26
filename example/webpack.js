const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        bundle: './index.js',
        vendor: ['simple-hotkeys','r-simple-uploader','simple-module']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [],
            exclude: /node_modules/
        }, {
            test: /\.css/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        },{
            test: /\.(eot|woff|ttf)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name][chunkhash:8].js', //开启webpack-dev-server后无法使用chunkHash，至webpack3.0依然未修复该问题
            children: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: path.resolve(__dirname, './views/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    performance: { //fix the windows OS warning, the issue is local https://stackoverflow.com/questions/41159817/how-to-disable-optimize-warnings-in-webpack-2/41159932
        hints: false
    },
    devServer: {
        disableHostCheck: true
    }
}
