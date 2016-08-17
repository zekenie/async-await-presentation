const Docker = require('dockerode');
const client = new Docker({socketPath: '/var/run/docker.sock'});
const streamBuffers = require("stream-buffers");
const readFilesFromDocker = require('./readFilesFromDocker');
const log = console.log.bind(console, 'DOCKER RUNNER >>')

module.exports = code => {
  return new Promise((resolve, reject) => {

    const command = [
      'cd /Development',
      `echo "${code.replace(new RegExp('"', 'g'), '\\"')}" > file.js`,
      'node --inspect --debug-brk file.js & node /debugger-client/writer', // start debugger process
      'exit'
    ].join('; ');

    log('assembled command', command)

    const stdoutStream = new streamBuffers.WritableStreamBuffer();

    client.run(process.env.DOCKER_HASH, ["bash", "-c", command], stdoutStream, function(err, data, container) {
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
              removeResolve(resp);
            })
          });
        })
        .then(() => {
          resolve(results);
        });



    })
  });
};