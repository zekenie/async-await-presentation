const React = require('react');
const ReactDom = require('react-dom');
const CodeMirror = require('react-codemirror');
const serverRequest = require('./serverRequest');
require('!style!css!sass!./styles/main.scss');

class StackVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// js code...',
      frames: []
    }
  }

  componentDidMount() {
    this.codeMirror = this.codeEditor.getCodeMirror();
  }

  getFrames() {
    return serverRequest.post('/', {
      body: { code: this.state.code }
    })
    .then(frames => this.setState({ frames }))
    .then(() => {
      console.log(this.state.frames);
    });
  }

  updateCode(newCode) {
      this.setState({
          code: newCode
      });
  }

  render() {
    return (
      <div>
        <Codemirror
          ref={el => this.codeEditor = el} 
          value={this.state.code} 
          options={{ lineNumbers: true }}
          onChange={this.updateCode.bind(this)} />
        <button onClick={this.getFrames.bind(this)}>Get Frames</button>
      </div>
    );
  }
}

ReactDom.render(<StackVisualizer/>, document.getElementById('app'));