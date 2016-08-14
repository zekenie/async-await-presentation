const Client = require('./client');

const log = console.log.bind(console, 'DEMO > ');

class Breakpoint {
  constructor(params) {
    Object.assign(this, params);
    this.time = Date.now();
  }

  get location() {
    return this.callFrames[0].location;
  }
}

module.exports = class Demo {
  constructor(onComplete) {
    this.frames = [];
    this.importantFrames = [];
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
      if(this.client.connected && delta > 300) {
        clearInterval(interval);
        this.finish();
      }
    }, 300);
  }

  finish() {
    this.client.close();
    this.onComplete(this.importantFrames, this.frames);
    log('~~~ done ~~~');
    log('frames caputred', this.frames.length);
    log('important frames caputred', this.importantFrames.length);
  }

  pause(params) {
    const breakpoint = new Breakpoint(params);
    if(!this.scriptId) {
      this.scriptId = breakpoint.location.scriptId;
    }
    this.frames.push(breakpoint);
    if(this.scriptId === breakpoint.location.scriptId) {
      this.importantFrames.push(breakpoint);
    }

    setTimeout(() => {
      this.next();
    }, 1);
  }

  next() {
    this.client.command('Debugger.stepInto');
  }
}

