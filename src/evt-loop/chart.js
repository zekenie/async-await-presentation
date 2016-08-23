'use strict';
const React = require('react');

const findMax = props =>  Math.max(...props.data.map(d => d[props.dataKey]));

const scale = (props, datum) => {
  const max = findMax(props);
  const scaleFactor = (props.height - 10) / max;
  return datum[props.dataKey] * scaleFactor;
}

module.exports = props => {
  const barwidth = (100-props.data.length) / props.data.length;
  return (
    <div className="chart mx1" style={{ height: props.height + 'px' }}>
      <div className="y-label">{findMax(props)}</div>
      <div className="y-label" style={{ top: props.height / 2 + 'px'}}>{Math.floor(findMax(props) / 2)}</div>

      {props.data.map((datum, i) => 
        <div
          className="bar"
          key={i}
          style={{
            height: scale(props, datum) + 'px',
            left: (i * (barwidth +1)) + '%',
            width: barwidth + '%'
          }}>
              <div className="x-label">{props.xLabel(datum)}</div>
          </div>
      )}
    </div>
  )
};