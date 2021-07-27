import React, { useCallback } from 'react';
import {CHANGE_TURN, CLICK_CELL} from "./TicTacToe";

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    const onClickTd = useCallback(()=> {
        console.log(rowIndex, cellIndex);
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });  // 한칸을 클릭했다는 액션을 만들고 몇번째줄 몇번째칸이다 라는 액션을 만들었다.
        dispatch({ type: CHANGE_TURN });
    },[]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td;