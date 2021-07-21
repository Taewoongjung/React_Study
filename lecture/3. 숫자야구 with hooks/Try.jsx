import React from 'react';

const Try = () => {
    const { tryInfo } = this.props;
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

export default Try;