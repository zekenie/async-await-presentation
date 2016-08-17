const WebSocket = require('ws');
const log = console.log.bind(console, 'DebuggerClient: ');

class Command {
  constructor(method, params, cb){
    this.method = method;
    this.params = params;
    this.cb = cb || function() {};
  }

  json() {
    return JSON.stringify(this);
  }

  processResponse(resp) {
    this.response = resp;
    this.cb(resp);
  }
}

module.exports = class DebuggerClient {
  constructor(url) {
    this.url = url;
    this.commands = [];
    this.queue = [];
    this.connected = false;
    this._setupWebSocket();
    this._methodListeners = new Map();
  }

  _getCommandById(id) {
    return this.commands[id-1];
  }

  _handleMessage(message) {
    const resp = JSON.parse(message);
    if(resp.id) {
      this._getCommandById(resp.id).processResponse(resp);
    }
    if(resp.method) {
      if(this._methodListeners.has(resp.method)) {
        this._methodListeners.get(resp.method).forEach(listener => {
          listener(resp.params);
        });
      }
    }
  }

  _setupWebSocket() {
    this.ws = new WebSocket(this.url);
    this.ws.on('message', this._handleMessage.bind(this));
    this.ws.on('open', () => {
      this.connected = true;
      log('channel open');
      this._drainQueue();
    })
  }

  _drainQueue() {
    if(!this.connected) { return; }
    while(this.queue.length) {
      this._send(this.queue.shift());
    }
  }

  _send(command) {
    command.id = this.commands.length + 1;
    this.commands.push(command);
    log('sending', command);
    this.ws.send(command.json(), err => log.bind(null, 'ERROR> '));
  }

  close() {
    this.ws.close();
    this.connected = false;
  }

  command() {
    this.queue.push(new Command(...arguments));
    this._drainQueue();
    return this;
  }

  listen(method, fn) {
    if(this._methodListeners.has(method)) {
      this._methodListeners.get(method).push(fn);
    } else {
      this._methodListeners.set(method, [fn]);
    }
    return this;
  }
}