'use strict';
const React = require('react');
const ReactDom = require('react-dom');
require('!style!css!sass!../styles/main.scss');
require('!style!css!font-awesome/css/font-awesome.css');


const SimpleStack = require('./simpleStack');
const SimpleQueue = require('./simpleQueue');
const Snippet = require('../codeSnippet');
const Sync = require('./01-sync');
const CallbackHell = require('./02-callbackHell');
const PromiseHell = require('./03-promiseHell');
const EventLoop = require('../evt-loop');


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="slide center">
          <br/><br/><br/>
          <h1>Promises</h1>
          <h3><a href="https://twitter.com/ZekeNierenberg" target="_blank">@ZekeNierenberg</a></h3>
          <br/><br/><br/><br/><br/><br/><br/>
          <a href="http://www.fullstackacademy.com/" target="_blank">
            <img src="/fs-logo-red.png" width="150"/>
          </a>
        </div>

        <div className="slide p1">
          <h2>Stack</h2>
          <SimpleStack/>
        </div>


        <div className="slide p1">
          <h2>The Callstack</h2>
          <Snippet>
            {require('raw!../../code-samples/callstack')}
          </Snippet>
        </div>

        <div className="slide p1">
          <h2>Queue</h2>
          <SimpleQueue/>
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

      </div>
    );
  }
}


ReactDom.render(<App/>, document.getElementById('app'));