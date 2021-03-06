import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        for (let i = 0; i < this.state.winNumbers.length - 1; i++) { // 비동기에다가 let을 쓰면 closure문제 안생긴다 || 보너스공을 빼야하니 -1을 함.
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); // 1초마다 하나씩 추가된다.
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus:winNumbers[6],
                redo: true,
            });
        }, 7000) // 마지막이 7초니깐 7초를 해준다.
    };

    componentDidMount() {
        console.log('componentDidMount');
        this.runTimeouts();
    }

    // redo를 눌렀을 때 다시 돌려줘야 하니깐
    componentDidUpdate(prevProps, prevState) { // 바뀌기 이전 state: prevState || 바뀐 후의 state: this.state
        console.log('componentDidUpdate');
        if (this.state.winBalls.length === 0) { // setState가 될 때 마다 componentDidUpdate가 실행되니깐 여기에서는 if문이 엄청 중요하다.
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        this.setState ({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null, // 보너스 공
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;