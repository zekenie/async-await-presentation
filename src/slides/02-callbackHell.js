const React = require('react');
const Snippet = require('../codeSnippet');

module.exports = props => (
  <div className="slide p1">
    <h1>Callback Hell</h1>
    <Snippet>
      {require('raw!../../code-samples/callbacks')}
    </Snippet>
  </div>
);

//