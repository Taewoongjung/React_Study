import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: '0',
    tableData: [['','',''],['','',''],['','','']],
};

const SET_WINNER = 'SET_WINNER'; // action의 이름은 이렇게 따로 빼놓는게 좋다.

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER :
            // state.winner = action.winner;  이렇게 직접 바꾸면 안됨.
            return {
                ...state,
                winner: action.winner,
            }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: '0' }) // dispatch 안에 들어가는 객체는 action 객체 라고 불린다. dispatch 하면 action을 실행하는 개념이다.
        // 이 action을 해석해서 직접 바꿔주는 역할이 reducer이다. action이 실행될 때 마다 실행되는 부분이 reducer이다.
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;