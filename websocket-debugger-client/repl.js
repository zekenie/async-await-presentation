const promisify = require('repl-promised').promisify;
const repl = require('repl');
const replServer = repl.start({
  prompt: 'λ : ',
  useColors: true
});

promisify(replServer);

const Demo = require('./demo')
replServer.context.demo = new Demo();