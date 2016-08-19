const React = require('react');
const SyntaxHighlighter = require('react-syntax-highlighter').default;
const docco = require('react-syntax-highlighter/dist/styles').docco;
const StackVisualizer = require('./stackVisualizer')
class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
  }

  play() {
    this.setState({
      playing: true
    });
  }

  close() {
    this.setState({
      playing: false
    });
  }



  render() {
    return (
      <div className="code-snippet">
        { this.state.playing ? 
          <StackVisualizer
            snippet={this}
            code={this.props.children} /> 
          : ''}
        <button onClick={this.play.bind(this)} className="btn">Play with it!</button>
        <SyntaxHighlighter className="syntax-highlighter" language='javascript' style={docco}>
          {this.props.children}
        </SyntaxHighlighter>
      </div>
    )
  }
}

module.exports = Snippet;