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
  return classes.join(' ');
}


module.exports = props => {
  let indentFactor = 0;
  return (
    <div className="frames">
      {
        props.frames.map((frame, i) => {
          if(i > 1) {
            try {
              indentFactor += frame.callFrames.length - props.frames[i-1].callFrames.length;
            }
            catch(e) {
              debugger;
            }
          }
          return (<div
                    key={i}
                    style={{ marginLeft: (indentFactor * 5) + 'px' }}
                    onMouseEnter={() => props.setFrame(i)}
                    className={classNames(frame, props)}>
                      { frame.important && frame.newFunction ? 
                        frame.callFrames[0].functionName  || <span className="muted small">(none)</span>
                        : '' }
                  </div>)
        })
      }
    </div>
  )
};