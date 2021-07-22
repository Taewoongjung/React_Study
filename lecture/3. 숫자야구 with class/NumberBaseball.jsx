import React, {Component} from 'react';
import Try from './Try';

function getNumbers () { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9,];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = (e) => {
        const { result, value, tries, answer } = this.state
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }] // 옛날 state로 현재의 state를 만들 때는 함수형 state를 사용해야한다.
                }
            });
            // this.setState({              위에 있는걸로 바뀜
            //     result: '홈런!',
            //     tries: [...prevState.tries, { try: value, result: '홈런!' }]
            // });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball ++;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value: '',
                    }
                });
            }
        }
        console.log(value);
    };

    onChangeInput = (e) => {
        console.log(this);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { result, value, tries } = this.state
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, index) => { // v = try, result
                        return (
                            <Try key={`${index + 1}차 시도 :`} tryInfo={v} /> // tryInfo를 이용해 props로 넘긴다.
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;