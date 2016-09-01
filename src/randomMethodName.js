const Chance = require('chance');

const randomInt = (min, max) => min + Math.round(max * Math.random());

const randomMethodName = () => chance
  .sentence({ words: randomInt(1,2) })
  .slice(0, -1) //take off period
  .toLowerCase()
  .split(' ')
  .join('.');


module.exports = randomMethodName;