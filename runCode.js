const exec = require('child_process').exec;
const fs = require('fs');

module.exports = code => {
  return new Promise(function(resolve, reject) {
    fs.writeFileSync('./codeInput.js', code);
    // node --inspect --debug-brk workingExample.js
    var child = exec(`node --inspect --debug-brk ./codeInput`, function(err, stdout) {
      if(err) { return reject(err); }
    });
    setTimeout(function() {
      resolve();

    }, 10)

  });
}

