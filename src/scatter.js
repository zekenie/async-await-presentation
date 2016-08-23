'use strict';
const React = require('react');

const findMax = (props, key) =>  Math.max(...props.data.map(d => d[key]));


const scale = (props, datum, key, maxPx) => {
  const max = findMax(props, key);
  const scaleFactor = (maxPx - 10) / max;
  return datum[key] * scaleFactor;
};


module.exports = props => {
  return (
    <div className="scatter" style={{ height: props.height + 'px', width: props.width + 'px' }}>

      <div className="y-description" style={{ width: props.height + 'px' }}>{props.yDescription}</div>
      <div className="x-description">{props.xDescription}</div>

      <div className="y-label" style={{ width: props.height + 'px' }}>{Math.floor(findMax(props,props.yKey))}</div>
      <div className="x-label">{Math.floor(findMax(props,props.xKey))}</div>
      {props.data.map((datum, i) => {
        return (
          <div 
            className="point"
            style={{
              bottom: scale(props, datum, props.yKey, props.height) + 'px',
              left: scale(props, datum, props.xKey, props.width) + 'px',
            }}
            key={i}>
              <div className="point-label">
                {datum.label}
              </div>
            </div>
        );
      })}
    </div>
  );
}