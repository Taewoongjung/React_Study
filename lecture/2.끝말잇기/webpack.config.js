const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실 서비스에서는: production
    devtool: 'eval',  // 빠르게 하겠다는 의미

    entry: {

    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'),
    }, // 출력
};