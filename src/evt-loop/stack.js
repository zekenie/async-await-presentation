'use strict';
const React = require('react');

function reverse(arr) {
  return [...arr].reverse();
}

const makeClasses = (props, stackMessage) => {
  const classes = ["p1"];
  if(props.selected === stackMessage) {
    classes.push('selected');
  }
  return classes.join(' ');
};

module.exports = props => (
  <div className="stack">
    {reverse(props.stack.map((stackMessage, i) => 
      <div
        className={makeClasses(props, stackMessage)}
        key={i}
        onMouseEnter={() => props.select(stackMessage)}
        onMouseLeave={() => props.unSelect(stackMessage)}>
          <span>{stackMessage}</span>
      </div>
    ))}
  </div>
);