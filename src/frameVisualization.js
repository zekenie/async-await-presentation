const React = require('react');

const classNames = (frame, props) => {
  const classes = ['frame'];
  if(frame.important) {
    classes.push('important');
  } else {
    classes.push('not-important');
  }
  if(props.frame === frame.i) {
    classes.push('selected');
  }
  if(frame.newFunction) {
    classes.push('new-function');
  }
  return classes.join(' ');
}

module.exports = props => (
  <div className="frames">
    {
      props.frames.map((frame, i) => <div
        key={i}
        style={{
          width: (100 / props.frames.length) + '%'
        }}
        onClick={() => props.setFrame(i)}
        className={classNames(frame, props)}></div>)
    }
  </div>
);