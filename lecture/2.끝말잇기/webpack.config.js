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
    module: {
       rules: [{
           test: /\.jsx$/,  // 정규표현식이다. 의미는 js랑 jsx파일에 rule을 적용하겠다.
           loader: 'babel-loader', // js,jsx에 바벨을 적용해서 최신이나 실험적인 문법을 옛날브라우저에서도 호환는 문법으로 바꿔주겠다는 의
           options: {
             presets: ['@babel/preset-env', '@babel/preset-react'], // 아까 설치한 preset 모듈들을 주면 된다.
             plugins: ['@babel/plugin-proposal-class-properties'],
           },
       }],
    }, // @babel/preset-env등을 설치 후 이것을 추가해주는데, 이것의 역할은 "entry 라는 파일을 읽고 거기에 모듈을 적용한 후 output에 뺀다"는 의미이다.
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, // 출력

    // client.jsx, WordRelay.jsx를 app.js에 합쳐줘야 하는데, client.jsx에서 이미 WordRelay.jsx를 불러오고 있어서 client.jsx만 불러오면 app.js에 합쳐진다.

    // (당구장) resolve에 확장자를 추가해주면 entry에 확장자를 적어줄 필요가 없이 웹팩에서 알아서 resolve에 리스트 되어있는 확장자 범위 안에서 찾아준다.

    // 실행 방법: npx webpack 을 해주면 dist/app.js에 코드가 합쳐진다.
};