const React = require('react');

const classNames = (frame, props, i) => {
  const classes = ['frame-bar'];
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
  let sameIndent = false;
  return (
    <div className="frames mt1">
      {
        props.frames.map((frame, i) => {
          if(i > 1) {
            sameIndent = frame.callFrames.length === props.frames[i-1].callFrames.length
            indentFactor += frame.callFrames.length - props.frames[i-1].callFrames.length;
            if(indentFactor < 0) { indentFactor = 0; }
          }
          return (
                  <div
                    key={i}
                    className="frame clearfix"
                    onMouseEnter={() => props.setFrame(i)}>
                    <span className="left">
                      { frame.important && !sameIndent ? 
                          frame.callFrames[0].functionName  || <span className="muted small">(annon)</span>
                          : '' }
                    </span>
                    <div
                      style={{ width: (5 + (indentFactor * 11)) + 'px' }}
                      className={classNames(frame, props, i)}>
                        
                    </div>
                  </div>
                  )
        })
      }
    </div>
  )
};