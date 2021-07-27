import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: '0',
    tableData: [['','',''],['','',''],['','','']],
};

export const SET_WINNER = 'SET_WINNER'; // action의 이름은 이렇게 따로 빼놓는게 좋다. 모듈로 만들어놓으면 다른 컴포넌트에서도 사용 가능해서.
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER :
            // state.winner = action.winner;  이렇게 직접 바꾸면 안됨.
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            const tableData = [...state.tableData]; // ...이 객체를 얕은복사한느것. spread라고 불린단다.
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결 가능
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
            };
        case CHANGE_TURN: {}
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',  // O면 X로 바꾸고, X면 O로 바꾸기
            }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: '0' }) // dispatch 안에 들어가는 객체는 action 객체 라고 불린다. dispatch 하면 action을 실행하는 개념이다.
        // 이 action을 해석해서 직접 바꿔주는 역할이 reducer이다. action이 실행될 때 마다 실행되는 부분이 reducer이다.
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;