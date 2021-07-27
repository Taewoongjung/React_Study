import React, { useCallback } from 'react';
import {CLICK_CELL} from "./TicTacToe";

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    const onClickTd = useCallback(()=> {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return; // 클릭을 하면 안바뀌게 끊기
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });  // 한칸을 클릭했다는 액션을 만들고 몇번째줄 몇번째칸이다 라는 액션을 만들었다.
    },[cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td;