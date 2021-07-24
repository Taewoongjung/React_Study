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

const computerChoice = (imgCoord) => { // 컴퓨터가 어떤 손을 내고 있는지 판단한다.
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};
class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이한다.
        // const {imgCoord} = this.state; // 비동기 안에서 이렇게 바깥 함수를 참조하면 클로저(closure) 문제가 생긴다. 그래서 안에다가 해줘야 한다.
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state; // 이렇게 비동기 함수 안에다가 해줘야 한다.
        console.log('hello', this.state.imgCoord, rspCoords.가위);
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
    }

    onClickBtn = (choice) => {
        const {imgCoord} = this.state;
        clearInterval(this.interval); // 클릭을 하면 setInterval을(묵찌빠 화면을) 멈춰주고
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => { // setState가 화면에 알아서 렌더링 해주니깐 이게 실행되면 다시 묵찌빠 화면이 돌아간다.
                return {
                    result: '이겼습니다!',
                    score:  prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다ㅠ',
                    score:  prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100)
        }, 2000);
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={() =>this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;