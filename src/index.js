const React = require('react');
const ReactDom = require('react-dom');
const StackVisualizer = require('./stackVisualizer');
require('!style!css!sass!./styles/main.scss');

const CallbackHell = require('./slides/01-callbackHell');
const PromiseHell = require('./slides/02-promiseHell');
const TheFuture = require('./slides/03-theFuture');
const Generators = require('./slides/04-generators');
const TheFutureIsNow = require('./slides/05-theFutureIsNow');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CallbackHell/>
      </div>
    );
  }
}

// <PromiseHell/>
        // <TheFuture/>
        // <Generators/>
        // <TheFutureIsNow/>

ReactDom.render(<App/>, document.getElementById('app'));