import React, {Component} from 'react';

function getNumbers () { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends React.Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onChangeInput = () => {

    };

    onSubmitForm = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {['like', 'like', 'like', 'like', 'like'].map(() => {
                        return (
                            <li>like</li>
                        );
                    })};
                </ul>
            </>
        );
    }
}

export default NumberBaseball;