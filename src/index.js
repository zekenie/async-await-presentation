const React = require('react');
const ReactDom = require('react-dom');
const Codemirror = require('react-codemirror');
const FrameVisualization = require('./frameVisualization');
const serverRequest = require('./serverRequest');
const Demo = require('../websocket-debugger-client/demo');

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
      frame: 0
    }
  }

  get onLastFrame() {
    return this.state.frame === this.state.frames.length;
  }

  get onFirstFrame() {
    return this.state.frame === 0;
  }

  changeFrame(direction) {
    if(direction === 'up') {
      if(this.onLastFrame) {
        return;
      }
      direction = 1;
    } else {
      if(this.onFirstFrame) {
        return;
      }
      direction  = -1;
    }

    this.setFrame(this.state.frame + direction);
  }

  setFrame(frameNumber) {
    const location = this.state.frames[frameNumber].callFrames[0].location;
    this.codeMirror.focus();
    // this.codeMirror.setCursor(location.lineNumber, location.columnNumber);
    this.codeMirror.setSelection({
      line: location.lineNumber,
      ch: 0
    }, {
      line: location.lineNumber,
      ch: this.codeMirror.getLine(location.lineNumber).length
    }, {
      scroll: true
    });
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
  }

  getFrames() {
    return serverRequest.post('/', {
      body: { code: this.state.code }
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        new Demo(frames => {
          resolve(frames);
        });
      });
    })
    .then(frames => {
      this.setState({ frames });
    })
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
      <div className="clearfix">
        <Codemirror
          className="col col-5 p1"
          ref={el => this.codeEditor = el} 
          value={this.state.code} 
          options={{ lineNumbers: true }}
          onChange={this.updateCode.bind(this)} />
        <div className="col col-5 p1">
          <button onClick={this.getFrames.bind(this)}>Get Frames</button>

          <div className={ this.state.frames.length > 1 ? '' : 'hide'}>
            <div>
              <button onClick={this.changeFrame.bind(this,'down')}>&lt;</button>
              Frame {this.state.frame + 1} / {this.state.frames.length}
              <button onClick={this.changeFrame.bind(this,'up')}>&gt;</button>
            </div>

            <FrameVisualization
              setFrame={this.setFrame.bind(this)}
              frame={this.state.frame}
              frames={this.state.frames}/>
          </div>

        </div>
        <div className="col col-2 01">
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