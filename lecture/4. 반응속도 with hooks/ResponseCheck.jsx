import React, { useState } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeout = useState(''); // 빨간색일 때 급하게 클릭한 경우 clearTimeout으로 초기화하기 위함
    let startTime = useState(''); // state에 넣어주면 렌더링을 하기 때문에 여기에 저장을 해서 렌더링이 안되게 하고 this.startTime으로 불러오게끔 한다.
    let endTime = useState('');

    const onClickScreen = () => {
        // waiting : 파란색
        // ready : 빨간색
        // now : 초록색
        if ( state === 'waiting' ) {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            setTimeout(() =>{
                setState('now');
                setMessage('지금 클릭');
                startTime = new Date();
            }, Math.floor(Math.random()*1000) + 2000); //2초~3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout); // 타이머 초기화하기
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult((prevState) => {
                return [...prevState.result,this.endTime - this.startTime]
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (
            result.length === 0
                ? null
                : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
                </>
        )
    };

    return (
          <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
              {/*{this.state.result.length === 0*/}
              {/*    ? null*/}
              {/*    : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>*/}
              {/*}*/}
              {renderAverage()} {/* 위 코드를 왼쪽과 같이 함수로 표현함*/}
          </>
    )
}

export default ResponseCheck;