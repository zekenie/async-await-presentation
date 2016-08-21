const React = require('react');
const Snippet = require('../codeSnippet');

module.exports = props => (
  <div className="slide p1">
    <div className="clearfix the-future-is-now">
      <div className="col col-3">
        <Snippet showButton={false}>
          {require('raw!../../code-samples/sync')}
        </Snippet>
      </div>

      <div className="col col-3">
        <Snippet showButton={false}>
          {require('raw!../../code-samples/callbacks')}
        </Snippet>
      </div>

      <div className="col col-3">
        <Snippet showButton={false}>
          {require('raw!../../code-samples/promises')}
        </Snippet>
      </div>

      <div className="col col-3">
        <Snippet showButton={false}>
          {require('!!raw!../../code-samples/async-await')}
        </Snippet>
      </div>
    </div>
  </div>
);

