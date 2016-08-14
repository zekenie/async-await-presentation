const exec = require('child_process').exec;
const fs = require('fs');

module.exports = code => {
  return new Promise(function(resolve, reject) {
    fs.writeFileSync('./codeInput.js', code);
    var child = exec(`node --debug-brk=5000 ./codeInput`, function(err, stdout) {
      if(err) { return reject(err); }
    });
    setTimeout(function() {
      var frames = require('./debugger')()
        // .then(function() {
        //   child.kill('SIGHUP');
        // });
      frames.then(resolve);
      frames.catch(reject);

    }, 120)

  });
}

