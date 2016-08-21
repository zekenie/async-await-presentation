const React = require('react');
const ReactDom = require('react-dom');
const StackVisualizer = require('./stackVisualizer');
require('!style!css!sass!./styles/main.scss');

const EventLoop = require('./evt-loop');
const CallbackHell = require('./slides/01-callbackHell');
const PromiseHell = require('./slides/02-promiseHell');
const TheFuture = require('./slides/03-theFuture');
const Generators = require('./slides/04-generators');
const Polyfill = require('./slides/05-polyfill');
// const TheFutureIsNow = require('./slides/06-theFutureIsNow');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="slide">
          <EventLoop handlers={[
            { event: 'click', callback: 'handleClick', probability: 0.5 },
            { event: 'drag', callback: 'handleDrag', probability: 0.25 },
            { event: 'timer', callback: 'checkUpdates', probability: 0.3 },
            { event: 'serverResponse', callback: 'ajaxResponse', probability: 0.5 }
          ]}/>
        </div>
        <CallbackHell/>
        <PromiseHell/>
        <TheFuture/>
        <Generators/>
        <Polyfill/>
      </div>
    );
  }
}

        // <TheFuture/>
        // <Generators/>
        // <TheFutureIsNow/>

ReactDom.render(<App/>, document.getElementById('app'));