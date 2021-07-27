import React, { useCallback, useEffect, useRef, memo } from 'react';
import {CLICK_CELL} from "./TicTacToe";

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    console.log('td rendered');

    // 최적화 방법
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);
    // 바뀌는것을 찾는 과정

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
})

export default Td;