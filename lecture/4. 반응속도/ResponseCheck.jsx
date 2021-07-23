import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    renderAverage = () => {
        const { result } = this.state;
        return (
            result.length === 0
                ? null
                : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
        )
    }

    render() {
        const { state, message } = this.state;
      return (
          <>
            <div
                id="screen"
                className={state}
                onClick={this.onClickScreen}
            >
                {message}
            </div>
              {/*{this.state.result.length === 0*/}
              {/*    ? null*/}
              {/*    : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>*/}
              {/*}*/}
              {this.renderAverage()} {/* 위 코드를 왼쪽과 같이 함수로 표현함*/}
          </>
      )
    }
}

export default ResponseCheck;