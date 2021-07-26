import React, { useState, useRef, useEffect, useMemo } from 'react';
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

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('runTimeouts');
        for (let i = 0; i < winNumbers.length - 1; i++) { // 비동기에다가 let을 쓰면 closure문제 안생긴다 || 보너스공을 빼야하니 -1을 함.
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevState) => [...prevState, winNumbers[i]]);
            }, (i + 1) * 1000); // 1초마다 하나씩 추가된다.
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // deps가 빈 배열이면 componentDidMount랑 같다.
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    const onClickRedo = () => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    };

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

export default Lotto;