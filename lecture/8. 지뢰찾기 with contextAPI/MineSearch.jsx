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
    halted: true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidateCell = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffleMine = [];
    // console.log('result = ', row * cell - mine);
    while (candidateCell.length > row * cell - mine) {
        const chosen = candidateCell.splice(Math.floor(Math.random() * candidateCell.length), 1)[0];
        shuffleMine.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for ( let k = 0; k < shuffleMine.length; k++) {
        const ver = Math.floor(shuffleMine[k] / cell);
        const hor = shuffleMine[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
};

export const START_GAME = 'START_GAMEl';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true, // 지뢰 클릭하면 게임 멈추기
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

    return (
        <TableContext.Provider value={{ tableData, dispatch }}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;