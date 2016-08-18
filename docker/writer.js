const Demo = require('./demo');
const fs = require('fs');

new Demo(frames => {
  fs.writeFileSync('/tmp/return_files/frames.json', JSON.stringify(frames));
  console.log('frames written');
  process.exit(0)
});

process.on('uncaughtException', (e) => {
  console.error(e, e.stack);
  process.exit(1);
});