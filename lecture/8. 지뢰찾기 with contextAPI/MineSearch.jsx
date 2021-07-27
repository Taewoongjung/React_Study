import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7, // 지뢰
    NORMAL: -1, // 아무것도 없는곳
    QUESTION: -2, // 그냥 물음표
    FLAG: -3, // 그냥 깃발
    QUESTION_MINE: -4, // 지뢰가 있는 곳에 물음표
    FLAG_MINE: -5,  // 지뢰가 있는 곳에 깃발
    CLICKED_MINE: -6, // 지뢰 클릭
    OPENED: 0, // 0 이상이면 다 opened가 됨
}

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    tableData: [
        [-1, -1, -1, -1, -1, -1, -1],
        [-7, -1, -1, -1, -1, -1, -1],
        [-1, -7, -1, -7, -7, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
    ],
    timer: 0,
    result: '',
};

const START_GAME = 'START_GAMEl';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

    return (
        <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;