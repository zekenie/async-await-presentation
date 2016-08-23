'use strict';
const React = require('react');

const makeClasses = (props, queueMessage) => {
  const classes = ["p1"];
  if(props.selected === queueMessage) {
    classes.push('selected');
  }
  return classes.join(' ');
};

module.exports = props => (
  <div className="queue">
    {props.queue.map((queueMessage, i) => 
      <div
        className={makeClasses(props, queueMessage)}
        key={i}
        onMouseEnter={() => props.select(queueMessage)}
        onMouseLeave={() => props.unSelect(queueMessage)}>
          <span className="muted">{i}</span> {queueMessage}
      </div>
    )}
  </div>
);