const React = require('react');

function reverse(arr) {
  return [...arr].reverse();
}

module.exports = props => (
  <div className="stack">
    {reverse(props.stack.map((stackMessage, i) => <div className="p1" key={i}><span>{stackMessage}</span></div>))}
  </div>
);