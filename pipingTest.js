const Demo = require('./docker/demo');

new Demo((frames) => {
  frames = frames.filter(frame => frame.stdout.length > 0)
  console.log(frames);
});