const tar = require('tar-stream');

const log = console.log.bind(console, 'Docker file reader >>');

function readFilesFromDocker(container, path) {
  log("reading files");
  return new Promise(function(resolve, reject) {
    const fileData = {};
    const extract = tar.extract();
    
    container.copy({ "Resource": path }, function(err, stream) {
      if(err) return reject(err)
      stream.pipe(extract);
    });
    
    extract.on('entry', function(header, stream, done) {
      log('ENTERING: ', header)
      if(header.type == 'file') {
        stream.pipe(concat()).then(function(fileContents) {
          fileData[header.name] = fileContents.toString();
          done();
        });
      } else {
        done();
      }
    });

    extract.on('finish', function() {
      resolve(fileData);
    });


  });
}

module.exports = readFilesFromDocker;