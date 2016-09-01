'use strict';
const React = require('react');
const Snippet = require('../codeSnippet');

module.exports = props => (
  <div className="slide p1">
    <h1>All Blocked Up</h1>
    <Snippet>
      {require('raw!../../code-samples/sync')}
    </Snippet>
  </div>
);

//