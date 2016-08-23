'use strict';
const React = require('react');

module.exports = props => {
  const framesWithStdout = props.frames
    .slice(0, props.frame)
    .filter(frame => frame.stdout.length);
  if(framesWithStdout.length) {
    return (
      <div className="stdout p1">
         {framesWithStdout.map((frame, i) => <pre key={i}>&gt; {frame.stdout}</pre>)}
      </div>
    );
  } else { return (<div/>)}

};