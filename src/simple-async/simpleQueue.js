const React = require('react');
const randomMethodName = require('../randomMethodName');

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: []
    }
  }

  enqueue() {
    this.setState(prev => {
      prev.queue.push(randomMethodName());
      console.log(prev.queue);
      return prev;
    });
  }

  dequeue() {
    this.setState(prev => {
      prev.queue.shift();
      return prev;
    });
  }

  render() {
    return (
      <div className="queue-container">
        <div className="clearfix simple-queue">
          <button onClick={this.enqueue.bind(this)} className="btn m1">Enqueue</button>
          <button onClick={this.dequeue.bind(this)} className="btn m1">Dequeue</button>
          <div className="mx-auto col-3 mb-1 queue-member-parent">
            <div>
              {this.state.queue.map((item, i) => {
                return <div className="p1 queue-member" key={i}>{item}</div>
              })}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

module.exports = Queue;