function logger() {
  console.log('LOGS', Date.now(), ...arguments);
}

function add(a, b) {
  return a + b;
}

logger(add(Math.random(), Math.random()));
logger(add(Math.random(), Math.random()));
logger(add(Math.random(), Math.random()));
logger(add(Math.random(), Math.random()));
logger(add(Math.random(), Math.random()));
logger(add(Math.random(), Math.random()));
