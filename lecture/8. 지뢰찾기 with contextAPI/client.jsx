const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import MineSearch from "./MineSearch";

const Hot = hot(MineSearch);

ReactDom.render(<Hot />, document.querySelector("#root"));