const React = require('react');
const ReactDom = require('react-dom');
const StackVisualizer = require('./stackVisualizer');
require('!style!css!sass!./styles/main.scss');
require('!style!css!font-awesome/css/font-awesome.css');

const EventLoop = require('./evt-loop');
const CallbackHell = require('./slides/02-callbackHell');
const PromiseHell = require('./slides/03-promiseHell');
const TheFuture = require('./slides/04-theFuture');
const Generators = require('./slides/05-generators');
const Polyfill = require('./slides/06-polyfill');
const TheFutureIsNow = require('./slides/07-theFutureIsNow');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="slide">
          <EventLoop handlers={[
            { event: 'dbQuery', callback: 'handleDb', probability: 0.5 },
            { event: 'APIRequest', callback: 'handleAPI', probability: 0.25 },
            { event: 'timer', callback: 'doUpdates', probability: 0.3 },
            { event: 'email', callback: 'handleEmail', probability: 0.5 }
          ]}/>
        </div>
        <CallbackHell/>
        <PromiseHell/>
        <TheFuture/>
        <Generators/>
        <Polyfill/>
        <TheFutureIsNow/>
      </div>
    );
  }
}


ReactDom.render(<App/>, document.getElementById('app'));