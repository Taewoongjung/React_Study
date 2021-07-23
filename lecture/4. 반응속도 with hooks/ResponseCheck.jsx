import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeout = useRef(null); // 빨간색일 때 급하게 클릭한 경우 clearTimeout으로 초기화하기 위함
    const startTime = useRef(); // state에 넣어주면 렌더링을 하기 때문에 여기에 저장을 해서 렌더링이 안되게 하고 this.startTime으로 불러오게끔 한다.
    const endTime = useRef();

    /*

    useState의 setState, setMessage, setResult는 return부분이 다시 실행된다. 그러나 useRef의 timeout, startTime, endTime은 바꾸고 있을때 return이 렌더링되지 않는다.
    즉, 바뀌기는 하지만 화면에는 영향을 미치고 싶지 않을 때 useRef를 쓴다.
    다시 말해 변하는 값들을 잠시 어디에 기록해두고 setState가 되면 렌더링이 된다.

    그리고 useRef면 해당 변수명.current로 접근을 해야한다.

    */

    const onClickScreen = () => {
        // waiting : 파란색
        // ready : 빨간색
        // now : 초록색
        if ( state === 'waiting' ) {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() =>{
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random()*1000) + 2000); //2초~3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current); // 타이머 초기화하기
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult((prevState) => {
                return [...prevState, endTime.current - startTime.current]
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