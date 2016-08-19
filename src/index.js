const React = require('react');
const ReactDom = require('react-dom');
const StackVisualizer = require('./stackVisualizer');
require('!style!css!sass!./styles/main.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <StackVisualizer/>
  }
}

ReactDom.render(<App/>, document.getElementById('app'));