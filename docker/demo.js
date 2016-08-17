const Client = require('./client');

const log = console.log.bind(console, 'DEMO > ');

class Breakpoint {
  constructor(params) {
    Object.assign(this, params);
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

    this.listenForClose();
  }

  listenForClose() {
    const interval = setInterval(() => {
      const ultimate = this.frames[this.frames.length - 1];
      const delta = Date.now() - ultimate.time;
      if(this.client.connected && delta > 800) {
        clearInterval(interval);
        this.finish();
      }
    }, 800);
  }

  finish() {
    this.client.close();
    this.onComplete(this.frames);
    log('~~~ done ~~~');
    log('frames caputred', this.frames.length);
  }

  pause(params) {
    const idx = this.frames.length;
    const breakpoint = new Breakpoint(params);
    breakpoint.i = idx;
    if(!this.scriptId) {
      this.scriptId = breakpoint.location.scriptId;
    }
    if(idx === 0) { breakpoint.newFunction = true; }
    if(idx > 0 && breakpoint.callFrames.length !== this.frames[idx-1].callFrames.length) {
      breakpoint.newFunction = true;
    }

    this.frames.push(breakpoint);
    if(this.scriptId === breakpoint.location.scriptId) {
      breakpoint.important = true;
    }

    setTimeout(() => {
      this.next();
    }, 1);
  }

  next() {
    this.client.command('Debugger.stepInto');
  }
}

