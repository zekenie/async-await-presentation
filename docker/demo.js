const Client = require('./client');

const log = console.log.bind(console, 'DEMO > ');

class Breakpoint {
  constructor(params) {
    Object.assign(this, params);
    this.stdout = '';
    this.time = Date.now();
  }

  get functionNames() {
    return this.callFrames
        .map(cf => cf.functionName);
  }

  matches(otherBreakpoint) {
    return this.functionNames.toString() === otherBreakpoint.functionNames.toString();
  }

  get location() {
    return this.callFrames[0].location;
  }
}

module.exports = class Demo {
  constructor(onComplete) {
    this.frames = [];
    this.scriptId = null;
    this.onComplete = onComplete || function() {};
    this.client = new Client('ws://localhost:9229/node')
      .command('Debugger.enable')
      .command('Runtime.enable')
      .command('Runtime.run')
      .listen('Debugger.paused', this.pause.bind(this));

    this.watchStdin();
    this.listenForClose();

    this.stepInto();

  }

  watchStdin() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', msg => {
      // if(this.frames.length === 0) { return; }
      const frame = this.frames[this.frames.length-1];
      if(frame) {
        frame.stdout += msg;
      }
    })
  }

  listenForClose() {
    const backupNextInterval = setInterval(() => {
      this.stepInto();
    }, 250)

    const interval = setInterval(() => {
      const ultimate = this.frames[this.frames.length - 1];
      const delta = Date.now() - ultimate.time;
      if(this.client.connected && delta > 500) {
        clearInterval(interval);
        clearInterval(backupNextInterval);
        this.finish();
      }
    }, 500);
  }

  finish() {
    this.client.close();
    this.onComplete(this.frames);
    log('~~~ done ~~~');
    log('frames captured', this.frames.length);
  }

  pause(params) {
    const idx = this.frames.length;
    const breakpoint = new Breakpoint(params);
    if(!this.scriptId) {
      this.scriptId = breakpoint.location.scriptId;
    }

    this.frames.push(breakpoint);

    const important = this.scriptId === breakpoint.location.scriptId;

      breakpoint.important = important;

    setTimeout(() => {
      // if(breakpoint.functionNames[0] === 'require') {
        // this.stepOver();
      // } else {
        this.stepInto();
      // }
    }, 2);
  }

  stepInto() {
    this.client.command('Debugger.stepInto');
  }

  stepOut() {
    this.client.command('Debugger.stepOut');
  }

  stepOver() {
    this.client.command('Debugger.stepOver');
  }
}


process.on('uncaughtException', console.error);