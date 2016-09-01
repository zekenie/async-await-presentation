'use strict';
const React = require('react');
const Snippet = require('../codeSnippet');

module.exports = props => (
  <div className="slide p1">
    <h1>The Future</h1>
    <Snippet showButton={false}>
      {require('!!raw!../../code-samples/async-await')}
    </Snippet>
  </div>
);

