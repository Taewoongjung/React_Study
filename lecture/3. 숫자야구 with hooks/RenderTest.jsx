import React, {Component} from "react";

class Test extends Component {
    state = {
        counter: 0,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {  // this.state.counter가 현재의 카운터고 nextState.counter가 미래에 바뀌는 카운터이다.
            return true;                                // 그래서 만약 state가 바뀌면 렌더링을 해라는 뜻이다. 이렇게 해줘야 쓸대없는 렌더링이 없어진다.
        }
        return false;
    }

    onClick = () => {  // setState만 호출하면 렌더링이 되어버린다
        this.setState({});
    };

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;