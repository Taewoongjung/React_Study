import React, { memo } from 'react';

// state를 사용하지 않는 애들임 hooks가 아님. 그냥 함수 컴포넌트라고 불림.
// memo 또는 PureComponent로 감싸는게 hoc(high order component) 고차함수라고 불리운다.
const Ball = memo(({ number }) => {
        const { number } = this.props;
        let background;
        if (number <= 10) {
            background = 'red';
        } else if (number <= 20) {
            background = 'orange';
        } else if (number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (
            <div className="ball" style={{ background }}>{number}</div>
        );
});

export default Ball;