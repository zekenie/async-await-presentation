const React = require('react');
const Snippet = require('../codeSnippet');
const Scatter = require('../scatter');

class Sample {
  constructor(label, code) {
    this.code = code;
    this.label = label
  }

  get lines() {
    return this.code.split('\n');
  }

  get numLines() {
    return this.lines.length;
  }

  get avgLineLength() {
    return this.lines
      .map(line => line.length)
      .reduce((prev, cur) => prev + cur, 0) / this.numLines;
  }
}

const code = {
  sync: new Sample('Sync', require('raw!../../code-samples/sync')),
  callbacks: new Sample('Callbacks', require('raw!../../code-samples/callbacks')),
  promises: new Sample('Promises', require('raw!../../code-samples/promises')),
  async: new Sample('Async', require('!!raw!../../code-samples/async-await'))
};

module.exports = props => (
  <div>
    <div className="slide">
      <div className="clearfix the-future-is-now">
        <div className="col col-3">
          <Snippet showButton={false}>
            {code.sync.code}
          </Snippet>
        </div>

        <div className="col col-3">
          <Snippet showButton={false}>
            {code.callbacks.code}
          </Snippet>
        </div>

        <div className="col col-3">
          <Snippet showButton={false}>
            {code.promises.code}
          </Snippet>
        </div>

        <div className="col col-3">
          <Snippet showButton={false}>
            {code.async.code}
          </Snippet>
        </div>
      </div>
    </div>
    <div className="slide">
      <div className="m4">
        <Scatter 
              data={Object.keys(code).map(key => code[key])}
              xKey='numLines'
              xDescription="# LOC"
              yKey='avgLineLength'
              yDescription="Avg Line Length"
              height={320}
              width={0.85 * window.innerWidth}/>
        </div>
    </div>
  </div>
);

