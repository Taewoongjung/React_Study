import React, { Component } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };

    onClickBtn = (choice) => {

    }

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이한다.
        // const {imgCoord} = this.state; // 비동기 안에서 이렇게 바깥 함수를 참조하면 클로저 문제가 생긴다. 그래서 안에다가 해줘야 한다.
        this.interval = setInterval(() => {
            const {imgCoord} = this.state; // 이렇게 비동기 함수 안에다가 해줘야 한다.
            if (imgCoord === rspCoords.바위) {
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보,
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
        }, 77);
    }

    componentDidUpdate() { // 리렌더링

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval);
    }

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;