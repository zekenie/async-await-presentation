const React = require('react');
const ReactDom = require('react-dom');
const Codemirror = require('react-codemirror');
const Stdout = require('./stdout');
const FrameVisualization = require('./frameVisualization');
const serverRequest = require('./serverRequest');

require('codemirror/mode/javascript/javascript');

require('!style!css!sass!./styles/main.scss');

class StackVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// js code...',
      frames: [{
        callFrames: []
      }],
      frame: 0, 
      loading: false,
      dirty: false
    }
  }

  get onLastFrame() {
    return this.state.frame === this.state.frames.length;
  }

  get onFirstFrame() {
    return this.state.frame === 0;
  }

  isUserCode(location) {
    return this.state.frames[0].callFrames[0].location.scriptId === location.scriptId;
  }

  setFrame(frameNumber) {
    const location = this.state.frames[frameNumber].callFrames[0].location;
    this.codeMirror.setSelection({ line: 0, ch: 0}, { line: 0, ch: 0 });
    if(this.isUserCode(location)) {
      const line = this.codeMirror.getLine(location.lineNumber);
      if(line) {
        this.codeMirror.focus();
        this.codeMirror.setSelection({
          line: location.lineNumber,
          ch: 0
        }, {
          line: location.lineNumber,
          ch: line.length
        }, {
          scroll: true
        });
      }
    }
    this.setState({ frame: frameNumber });
  }

  componentDidMount() {
    this.codeMirror = this.codeEditor.getCodeMirror();
    this.setupCodeMirrorListeners();
  }

  setupCodeMirrorListeners() {
    this.codeMirror.on('cursorActivity', codeMirror => {
      const line = codeMirror.doc.getCursor().line;
      this.setState({ line: line + 1 });
    });

    this.codeMirror.on('change', () => {
      this.setState({ dirty: true });
    })
  }

  reset() {
    this.setState({
      frames: [{
        callFrames: []
      }],
      frame: 0, 
      loading: false,
      dirty: false
    });
  }

  getFrames() {
    this.reset();
    this.setState({ loading: true })
    return serverRequest.post('http://104.131.79.144', {
      body: { code: this.state.code }
    })
    .then(frames => {
      this.setState({ frames, loading: false });
    });
  }

  updateCode(newCode) {
      this.setState({
          code: newCode
      });
  }

  render() {
    return (
      <div className="clearfix">
        <div className="code-container col col-5">
          <Codemirror
            ref={el => this.codeEditor = el} 
            value={this.state.code} 
            options={{ lineNumbers: true }}
            onChange={this.updateCode.bind(this)} />
        </div>
        <div className="col col-4 px2">
          { this.state.dirty ? 
            <button className="mx1 p1 btn col-12" onClick={this.getFrames.bind(this)}>Get Frames</button>
            : ''
          }

          <div className={ this.state.loading ? 'center p1' : 'hide'}>Loading...</div>

          <div className={ this.state.frames.length > 1 ? '' : 'hide'}>
            <FrameVisualization
              setFrame={this.setFrame.bind(this)}
              frame={this.state.frame}
              frames={this.state.frames}/>
          </div>

        </div>

        { this.state.frames.length > 1 ? 
          <div className="col col-3">
            <Stdout 
              frames={this.state.frames} 
              frame={this.state.frame}/>
            </div> : '' }

        <div id="stack">
          {
            this.state.frames[this.state.frame].callFrames
              .map((frame,i) => <div key={i}>{frame.functionName}</div>)
          }
        </div>
      </div>
    );
  }
}

ReactDom.render(<StackVisualizer/>, document.getElementById('app'));