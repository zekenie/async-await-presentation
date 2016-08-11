var fs = require('fs');
var DebuggerApi = require('debugger-api');

function setBreakPointsOnFile(file, dbugger) {
  file = file.split('file://')[1];
  var code = fs.readFileSync(file, 'utf8');
  code.split('\n')
    .forEach((line, i) => {
      if(i === 0) { return; }
      if(line.trim() === '') { return; }
      dbugger.setBreakpointByUrl({
        url: file,
        lineNumber: i + 1
      });
    })
}

module.exports = () => {
  return new Promise(function(resolve, reject) {
    var dbugger = new DebuggerApi({debugPort: 5000});
    dbugger.enable();
    var frames = [];


    dbugger.once('Debugger.paused', function(firstBreak) {
      var scriptId = firstBreak.callFrames[0].location.scriptId,
          url = dbugger.scripts.findScriptByID(scriptId).url

      setBreakPointsOnFile(url, dbugger);

      dbugger.on('Debugger.paused', function(b) {
        frames.push(b);
        dbugger.resume(null, function() {});
      })
      dbugger.resume(null, function() {});

    });

    dbugger.on('error', reject);
    setTimeout(function() {
      resolve(frames);
    }, 1500);
    
  })
}

