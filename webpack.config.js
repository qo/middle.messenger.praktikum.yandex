const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const production = process.env.NODE_ENV === 'production';

module.exports = {
    /*
        * Важный коммент
        * В паге я нашел баг, из-за которого мой проект не запускается.
        * Возникает он в депенденси pug-filters, в папке lib, в файле run-filter.js на 33 строке.
        * Если переписать строку
        * var tr = jstransformer(require(trPath));
        * на
        * var tr = jstransformer(require(`${trPath}`));
        * проект будет работать без сплывающих предупреждений
        * 'Critical dependency: the request of a dependency is an expression'.
        * В доке я нашел, как можно заставить вебпак игнорить pug-filters
        * https://webpack.js.org/configuration/stats/#statswarningsfilter
        * Насколько я понял, проблема возникала и у других ребят на курсе, которые юзали паг.
    */
    stats: {
        warningsFilter: /pug-filters/,
    },
    mode: "development",
    entry: './src/index.ts',
    output: {
        filename: production ? "bundle.[hash].js" : "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "fs": false
        },
    },
    devtool: !production ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: !production,
    },
    plugins: [
        new NodePolyfillPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeComment: production,
                collapseWhitespace: production
            },
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: production ? 'bundle.[hash].css' : 'bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|woff2|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,

                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
        ],
    },

}
