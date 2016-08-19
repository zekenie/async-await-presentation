// https://gist.github.com/jakearchibald/31b89cba627924972ad6
// based on 

function async(generatorFunc) {
  return function promiseChainBuilder() {
    /** create generator object */
    const generator = generatorFunc(...arguments);

    /**
     * 
     * @param  {String}    verb name of method to invoke on generator
     * @param  {*}         valForGenerator stick back in the generator
     * @return {Promise} value or promise for value
     */
    function continuer(valForGenerator) {
      let result;
        result = generator.next(valForGenerator);
      if (result.done) {
        return result.value;
      } else {
        return result.value
          .then(continuer);
      }
    }

    return continuer();
  }
}

function dbQuery(thing) {
  return Promise.resolve(thing)
}

function getUser(id) {
  return dbQuery({
    name: 'Zeke',
    email: 'zeke@fullstackacademy.com',
    getMail: () => Promise.resolve(dbQuery([]))
  });
};

const doStuffWithMail = async(function* mailGenerator(id) {
  const user = yield getUser(id);
  console.log(`user name is ${user.name}`)
  const mail = yield user.getMail();
  const otherUserInfo = yield dbQuery(user, 44);
  return mail.map(() => {})
});

doStuffWithMail()
