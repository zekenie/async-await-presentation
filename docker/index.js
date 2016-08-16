const Docker = require('dockerode');
const client = new Docker({socketPath: '/var/run/docker.sock'});
const streamBuffers = require("stream-buffers");
const readFilesFromDocker = require('./readFilesFromDocker');
const log = console.log.bind(console, 'DOCKER RUNNER >>')

module.exports = code => {
  return new Promise((resolve, reject) => {

    const command = [
      'cd /Development',
      `echo \"${code}\" > file.js`,
      'node --inspect --debug-brk file.js &> /dev/null', // start debugger process
      'node /debugger-client/writer',
      'exit'
    ].join(' && ');

    log('assembled command', command)

    const stdoutStream = new streamBuffers.WritableStreamBuffer();

    client.run('e3c389a0f137', ["bash", "-c", command], stdoutStream, function(err, data, container) {
      if(err) { return reject(err); }
      log('bash:', command);

      const results = {
        stdout: stdoutStream.getContentsAsString("utf8")
      };

      readFilesFromDocker(container, '/tmp/return_files')
        .then(fileData => {
          results.fileData = fileData;
          results.frames = fileData['return_files/frames.json']
        })
        .then(() => {
          return new Promise((removeResolve, removeReject) => {
            container.remove((err, resp) => {
              if(err) { return removeReject(err); }
              resolve(resp);
            })
          });
        })
        .then(() => {
          resolve(results);
        });



    })
  });
};