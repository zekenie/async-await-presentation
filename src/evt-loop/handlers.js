const React = require('react');

module.exports = props => (
  <div className="handlers p1 clearfix">
    {props.handlers.map((handler, i) => (
      <div key={i} className="col col-3 m1 p1">
        <p>Event: {handler.event}</p>
        <p>Callback: {handler.callback}</p>
      </div>
    ))}
  </div>
);