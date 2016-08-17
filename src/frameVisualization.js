const React = require('react');

const classNames = (frame, props, i) => {
  const classes = ['frame'];
  if(frame.important) {
    classes.push('important');
  } else {
    classes.push('not-important');
  }
  if(props.frame === i) {
    classes.push('selected');
  }
  return classes.join(' ');
}


module.exports = props => {
  let indentFactor = 0;
  return (
    <div className="frames mt1">
      {
        props.frames.map((frame, i) => {
          if(i > 1) {
            indentFactor += frame.callFrames.length - props.frames[i-1].callFrames.length;
            if(indentFactor < 0) { indentFactor = 0; }
          }
          return (<div
                    key={i}
                    style={{ marginLeft: (indentFactor * 5) + 'px' }}
                    onMouseEnter={() => props.setFrame(i)}
                    className={classNames(frame, props, i)}>
                      { frame.important && frame.newFunction ? 
                        frame.callFrames[0].functionName  || <span className="muted small">(none)</span>
                        : '' }
                  </div>)
        })
      }
    </div>
  )
};