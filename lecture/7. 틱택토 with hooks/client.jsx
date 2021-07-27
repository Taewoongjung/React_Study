const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import TicTacToe from "./TicTacToe";

const Hot = hot(TicTacToe);

ReactDom.render(<Hot />, document.querySelector("#root"));