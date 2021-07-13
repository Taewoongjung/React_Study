const path = require('path');

module.exports = {
    name: 'word-relay-dev',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    entry: {
        app: './client.jsx',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ],
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
    },
};