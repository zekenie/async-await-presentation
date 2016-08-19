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


module.exports = class FrameVisualization extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      excludeNodeFrames: true
    };
  }

  handleExcludeToggle(e) {
    this.setState({ excludeNodeFrames: !this.state.excludeNodeFrames });
  }

  render() {
    let indentFactor = 0;
    let sameIndent = false;
    return (
      <div className="frames mt1">
        <div className="clearfix">
          <div className="right">
            <span className="muted">No Node.js frames?</span>
            <input
              type="checkbox"
              onClick={this.handleExcludeToggle.bind(this)}
              checked={this.state.excludeNodeFrames} />
          </div>
        </div>
        {
          this.props.frames
          //!this.state.excludeNodeFrames || frame.important
            .map((frame, i) => {
              if(i > 1) {
                sameIndent = frame.callFrames.length === this.props.frames[i-1].callFrames.length
                indentFactor += frame.callFrames.length - this.props.frames[i-1].callFrames.length;
                if(indentFactor < 0) { indentFactor = 0; }
              }
              const includeFrame = !this.state.excludeNodeFrames || frame.important;
              return includeFrame ? (
                      <div
                        key={i}
                        className="frame clearfix"
                        onMouseEnter={() => this.props.setFrame(i)}>
                        <span className="left">
                          { frame.important && !sameIndent ? 
                              frame.callFrames[0].functionName  || <span className="muted small">(annon)</span>
                              : '' }
                        </span>
                        <div
                          style={{ width: (5 + (indentFactor * 11)) + 'px' }}
                          className={classNames(frame, this.props, i)}>
                            
                        </div>
                      </div>
                      ) : '';
            })
        }
      </div>
    );
  }
}
