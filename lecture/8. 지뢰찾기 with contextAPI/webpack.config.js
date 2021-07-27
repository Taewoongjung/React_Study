const path = require('path');

module.exports = {
    name: 'minesearch-dev',
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
        }],
    },
    plugins: [
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    },
};