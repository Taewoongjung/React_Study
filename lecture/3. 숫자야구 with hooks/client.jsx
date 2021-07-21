const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import NumberBaseball from "./NumberBaseball";

const Hot = hot(NumberBaseball);

ReactDom.render(<Hot />, document.querySelector("#root"));