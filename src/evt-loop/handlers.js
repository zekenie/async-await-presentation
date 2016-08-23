'use strict';
const React = require('react');

const makeClasses = (props, handler) => {
  const classes = ["border", "px1"];
  if(props.selected === handler.callback) {
    classes.push('selected');
  }
  return classes.join(' ');
}

module.exports = props => (
  <div className="handlers clearfix">
    {props.handlers.map((handler, i) => (
      <div 
        key={i}
        className="handler pl0 pt1 pr1 pb1 sm-col sm-col-12 md-col md-col-6 lg-col lg-col-3"
        onClick={() => props.enqueue(handler.callback)}
        onMouseEnter={() => props.select(handler.callback)}
        onMouseLeave={() => props.unSelect(handler.callback)}>
          <div className={makeClasses(props, handler)}>
            <div className="right">
              <input 
                type="checkbox"
                value={props.handlerAutoPlayList.has(handler)}
                onChange={() => props.setParentState(prev => {
                  if(props.handlerAutoPlayList.has(handler)) {
                    prev.handlerAutoPlayList.delete(handler);
                  } else {
                    prev.handlerAutoPlayList.add(handler);
                  }
                  return prev;
                })}
                />
            </div>
            <p>Event: {handler.event}</p>
            <p>Callback: {handler.callback}</p>
          </div>
      </div>
    ))}
  </div>
);