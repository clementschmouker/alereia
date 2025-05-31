const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/ts/index.ts',
    mode: 'development',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i, // Add image handling
                type: 'asset/resource', // Automatically manage images
                generator: {
                  filename: 'images/[name][ext][query]', // Define the output location for images
                },
              },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/**/*.php',
                to({ context, absoluteFilename }) {
                  const relativePath = path.relative(path.resolve(__dirname, 'src'), absoluteFilename);
                  return path.resolve(__dirname, 'public', relativePath);
                },
              },
              {
                from: 'src/images/**/*',
                to: path.resolve(__dirname, 'public/images/[name][ext]'),
              },
              {
                from: 'src/fonts/**/*',
                to: path.resolve(__dirname, 'public/fonts/[name][ext]'),
              },
              {
                from: 'src/pdf/**/*',
                to: path.resolve(__dirname, 'public/pdf/[name][ext]'),
              }
            ],
          }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
};
