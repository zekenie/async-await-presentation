const React = require('react');
const Chance = require('chance');
const chance = new Chance();
const Queue = require('./queue');
const Chart = require('./chart');
const Stack = require('./stack');
const Handlers = require('./handlers');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');

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
      frame: 0,
      handlerAutoPlayList: new Set(),
      playing: false,
      stackSizes: [],
      queueSizes: [],
      stack: [],
      queue: [],
      selected: '',
      blockingCallProbability: 0.36,
      eventFrequency: 0.17,
      tickInterval: 600
    }

    this.select = this.select.bind(this);
    this.unSelect = this.unSelect.bind(this);

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
    };

  }

  togglePlay() {
    this.setState({
      playing: !this.state.playing
    });
    setTimeout(() => {
      if(this.state.playing) {
        this.exerciseHandlers();
      }
      this.tick();
      
    }, 0);
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
    if(!this.state.playing) { return; }
    this.setState({
      frame: this.state.frame + 1
    });

    // stack is empty
    if(this.api.stack.empty()) {
      const fn = this.api.queue.dequeue();
      if(fn) {
        this.api.stack.push(fn);
      }
    } else {
      if(Math.random() < this.state.blockingCallProbability) {
        this.api.stack.push(randomMethodName())
      } else {
        this.api.stack.pop();
      }
    }

    if(Math.random() < this.state.eventFrequency) {
      this.exerciseHandlers();
    }

    this.recordMetrics();

    setTimeout(this.tick.bind(this), this.state.tickInterval);

  }

  recordMetrics() {
    this.setState(prev => {
      if(prev.queueSizes.length > 30) {
        prev.queueSizes.shift();
      }
      if(prev.stackSizes.length > 30) {
        prev.stackSizes.shift();
      }
      prev.stackSizes.push({ size: this.state.stack.length, frame: this.state.frame });
      prev.queueSizes.push({ size: this.state.queue.length, frame: this.state.frame });
      return prev;
    });
  }

  exerciseHandlers() {
    for(let handler of this.props.handlers) {
      if(Math.random() < handler.probability) {
        if(this.state.handlerAutoPlayList.has(handler)) {
          this.api.queue.enqueue(handler.callback);
        }
      }
    }
  }

  select(fnName) {
    this.setState({ selected: fnName });
  }

  unSelect() {
    this.setState({ selected: '' });
  }

  render() {
    return (
      <div className="event-loop">
        <Stack
          select={this.select}
          unSelect={this.unSelect}
          selected={this.state.selected}
          stack={this.state.stack}/>

        <div className="message message-callstack">CALLSTACK</div>
        <div className="shove-over pt2">
          <div className="right controls">
            <button onClick={this.togglePlay.bind(this)} className="btn">
              <i 
                className={this.state.playing ? 'fa fa-pause' : 'fa fa-play'}
                aria-hidden="true"></i>
            </button>
          </div>
          <Tabs>
            <TabList>
              <Tab>Event Handlers</Tab>
              <Tab>Graphs</Tab>
            </TabList>

            <TabPanel>
              <Handlers
                select={this.select}
                unSelect={this.unSelect}
                enqueue={this.api.queue.enqueue}
                selected={this.state.selected}
                setParentState={this.setState.bind(this)}
                handlerAutoPlayList={this.state.handlerAutoPlayList}
                handlers={this.props.handlers}/>
            </TabPanel>

            <TabPanel>
              <div className="clearfix">
                <div className="col col-6">
                  <div className="center">Stack Size</div>
                  <Chart
                    dataKey="size"
                    height={150}
                    xLabel={(datum) => datum.frame}
                    data={this.state.stackSizes}/>
                </div>
                <div className="col col-6">
                  <div className="center">Queue Size</div>
                  <Chart
                    dataKey="size"
                    height={150}
                    xLabel={(datum) => datum.frame}
                    data={this.state.queueSizes}/>
                  </div>
              </div>

              <div className="settings clearfix pt2">
                <div className="col m1">
                  <label>Blocking Calls</label>
                  <input
                    type="range"
                    min="0"
                    step="0.01"
                    value={this.state.blockingCallProbability}
                    onChange={(e) => this.setState({ blockingCallProbability: e.target.value })}
                    max="1"/>
                </div>

                <div className="col m1">
                  <label>Event Frequency</label>
                  <input
                    type="range"
                    step="0.01"
                    value={this.state.eventFrequency}
                    onChange={(e) => this.setState({ eventFrequency: e.target.value })}
                    min="0"
                    max="1"/>
                </div>

                <div className="col m1">
                  <label>Tick Interval {this.state.tickInterval}</label>
                  <input
                    type="range"
                    step="25"
                    value={this.state.tickInterval}
                    onChange={(e) => this.setState({ tickInterval: e.target.value })}
                    min="100"
                    max="2000"/>
                </div>
              </div>
            </TabPanel>
          </Tabs>

        </div>

        <div className="message message-queue">QUEUE</div>

        <Queue
          select={this.select}
          unSelect={this.unSelect}
          selected={this.state.selected}
          queue={this.state.queue}/>
      </div>
    );
  }
}

EventLoop.propTypes = {
  handlers: React.PropTypes.instanceOf(Array).isRequired
};

module.exports = EventLoop;