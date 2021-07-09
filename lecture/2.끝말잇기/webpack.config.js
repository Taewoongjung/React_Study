const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실 서비스에서는: production
    devtool: 'eval',  // 빠르게 하겠다는 의미
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, // 출력

    // client.jsx, WordRelay.jsx를 app.js에 합쳐준다는 의미이다.

    // 그러나 client.jsx에서 이미 WordRelay.jsx를 불러오고 있어서 client.jsx만 불러오면 app.js에 합쳐진다.

    // (당구장) resolve에 확장자를 추가해주면 entry에 확장자를 적어줄 필요가 없이 웹팩에서 알아서 resolve에 리스트 되어있는 확장자 범위 안에서 찾아준다.
};