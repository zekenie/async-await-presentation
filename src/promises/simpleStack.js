const React = require('react');
const randomMethodName = require('../randomMethodName');

function reverse(arr) {
  return [...arr].reverse();
}

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: []
    }
  }

  push() {
    this.setState(prev => {
      prev.stack.push(randomMethodName());
      console.log(prev.stack);
      return prev;
    });
  }

  pop() {
    this.setState(prev => {
      prev.stack.pop();
      return prev;
    });
  }

  render() {
    return (
      <div className="stack-container">
        <div className="clearfix simple-stack">
          <div className="mx-auto col-3 mb-1 stack-member-parent">
            <div>
              {reverse(this.state.stack.map((item, i) => {
                return <div className="p1 stack-member" key={i}>{item}</div>
              }))}
            </div>
          </div>
          <button onClick={this.push.bind(this)} className="btn m1">Push</button>
          <button onClick={this.pop.bind(this)} className="btn m1">Pop</button>
        </div>

      </div>
    );
  }
}

module.exports = Stack;