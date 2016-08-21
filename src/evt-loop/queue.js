const React = require('react');

module.exports = props => (
  <div className="queue">
    {props.queue.map((queueMessage, i) => 
      <div className="p1" key={i}>
        <span className="muted">{i}</span> {queueMessage}
      </div>
    )}
  </div>
);