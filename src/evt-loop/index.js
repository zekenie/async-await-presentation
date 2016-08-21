const React = require('react');
const Chance = require('chance');
const chance = new Chance();
const Queue = require('./queue');
const Stack = require('./stack');
const Handlers = require('./handlers');
const randomInt = (min, max) => min + Math.round(max * Math.random());



const randomMethodName = () => chance
  .sentence({ words: randomInt(1,2) })
  .slice(0, -1) //take off period
  .toLowerCase()
  .split(' ')
  .join('.');


class EventLoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [],
      queue: []
    }
    this.api = {
      stack: {
        push: this.stateMethodCall.bind(this, 'stack', 'push'),
        pop: this.stateMethodCall.bind(this, 'stack', 'pop'),
        empty: () => this.state.stack.length === 0
      },
      queue: {
        enqueue: this.stateMethodCall.bind(this, 'queue', 'push'),
        dequeue: this.stateMethodCall.bind(this, 'queue', 'shift'),
      }
    }
  }

  componentDidMount() {
    setInterval(this.tick.bind(this), 600)
  }

  stateMethodCall(prop, method, ...args) {
    let result;
    this.setState(prev => {
      if(typeof prev[prop] !== 'undefined') {
        if(typeof prev[prop][method] === 'function') {
          result = prev[prop][method](...args);
        }
      }
      return prev;
    })
    return result;
  }

  tick() {
    // stack is empty
    if(this.api.stack.empty()) {
      const fn = this.api.queue.dequeue();
      if(fn) {
        this.api.stack.push(fn);
      }
    } else {
      if(Math.random() > 0.65) { // a num between 0.4 and 1. if the stack length is small, it should be small
        this.api.stack.push(randomMethodName())
      } else {
        this.api.stack.pop();
      }
    }

    if(Math.random() < 0.20) {
      this.exerciseHandlers();
    }

  }

  exerciseHandlers() {
    for(let handler of this.props.handlers) {
      if(Math.random() < handler.probability) {
        this.api.queue.enqueue(handler.callback);
      }
    }
  }

  render() {
    return (
      <div className="event-loop">
        <Stack stack={this.state.stack}/>
        <Handlers handlers={this.props.handlers}/>
        <Queue queue={this.state.queue}/>
      </div>
    );
  }
}

EventLoop.propTypes = {
  handlers: React.PropTypes.instanceOf(Array).isRequired
};

module.exports = EventLoop;