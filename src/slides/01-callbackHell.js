const React = require('react');
const Snippet = require('../codeSnippet');

module.exports = props => (
  <div className="slide">
    <Snippet>
      {require('raw!../../code-samples/callbacks')}
    </Snippet>
  </div>
);

//