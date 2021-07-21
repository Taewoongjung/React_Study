const React = require('react');
const Try = require('./Try');
// import React from 'react';
// import Try from './Try';

function getNumbers () { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9,];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = React.useState('');
    const [value, setValue] = React.useState('');
    const [tries, setTries] = React.useState([]);
    const answer = getNumbers();

    const onChangeInput = (e) => {
        console.log(this);
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!', setTries([...tries, { try: value, result: '홈런!' }]));
            alert('게임을 다시 시작합니다!');
            setValue('');
            setTries([]);

        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)
                alert('게임을 다시 시작합니다!');
                setValue('');
                setTries([]);
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball ++;
                    }
                }
                setTries([...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]);
                setValue('');
            }
        }
        console.log(value);
    };
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
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
};

module.exports = NumberBaseball;