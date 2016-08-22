const React = require('react');
const ReactDom = require('react-dom');
const StackVisualizer = require('./stackVisualizer');
require('!style!css!sass!./styles/main.scss');
require('!style!css!font-awesome/css/font-awesome.css');

const Snippet = require('./codeSnippet');

const EventLoop = require('./evt-loop');
const Sync = require('./slides/01-sync');
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
        <div className="slide center">
          <br/><br/><br/>
          <h1>await... async</h1>
          <h3><a href="https://twitter.com/ZekeNierenberg" target="_blank">@ZekeNierenberg</a></h3>
        </div>

        <div className="slide p1">
          <h2>Dependencies:</h2>
          <div className="clearfix">
            <iframe 
              className="col col-6"
              width="420" height="315"
              src="https://www.youtube.com/embed/8aGhZQkoFbQ?autoplay=0">
            </iframe>

            <iframe 
              className="col col-6"
              width="420" height="315"
              src="https://www.youtube.com/embed/qbKWsbJ76-s?autoplay=0">
            </iframe>

          </div>
        </div>

        <div className="slide m1">
          <h2>4 tasks...</h2>
          <Snippet showButton={false}>
          {`db.query('SELECT * FROM ...', handleDB);`}
          </Snippet>

          <br/>

          <Snippet showButton={false}>
          {`router.get('/', handleAPI);`}
          </Snippet>

          <br/>

          <Snippet showButton={false}>
          {`setTimeout(doUpdates, 250);`}
          </Snippet>
          <br/>

          <Snippet showButton={false}>
          {`email.on('new-message', handleEmail);`}
          </Snippet>
        </div>

        <div className="slide">
          <EventLoop handlers={[
            { event: 'dbQuery', callback: 'handleDb', probability: 0.5 },
            { event: 'APIRequest', callback: 'handleAPI', probability: 0.25 },
            { event: 'timer', callback: 'doUpdates', probability: 0.3 },
            { event: 'email', callback: 'handleEmail', probability: 0.5 }
          ]}/>
        </div>
        <Sync/>
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