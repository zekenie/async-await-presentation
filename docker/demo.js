const Client = require('./client');

const log = console.log.bind(console, 'DEMO > ');

class Breakpoint {
  constructor(params) {
    Object.assign(this, params);
    this.time = Date.now();
    this.consoleMessages = [];
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
      .listen('Debugger.paused', this.pause.bind(this))
      .listen('Runtime.consoleAPICalled', this.consoleData.bind(this));

    this.listenForClose();
    this.listenForConsole();


    this.next();
  }

  consoleData(params) {
    const frame = this.frames[this.frames.length];
    frame.consoleMessages.push(params);
  }

  listenForClose() {
    const interval = setInterval(() => {
      const ultimate = this.frames[this.frames.length - 1];
      const delta = Date.now() - ultimate.time;
      if(this.client.connected && delta > 500) {
        clearInterval(interval);
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
    if(this.scriptId === breakpoint.location.scriptId) {
      breakpoint.important = true;
    }

    setTimeout(() => {
      this.next();
    }, 2);
  }

  next() {
    this.client.command('Debugger.stepInto');
  }
}

