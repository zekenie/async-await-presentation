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
    function continuer(verb, valForGenerator) {
      let result;
      try {
        result = generator[verb](valForGenerator);
      } catch (err) {
        return Promise.reject(err);
      }
      if (result.done) {
        return Promise.resolve(result.value);
      } else {
        return Promise
          .resolve(result.value)
          .then(onFulfilled, onRejected);
      }
    }

    const onFulfilled = continuer.bind(null, "next");
    const onRejected = continuer.bind(null, "throw");

    return onFulfilled();
  }
}

function dbQuery(thing) {
  return Promise.resolve(thing)
}

function async(getUser(id) {
  return dbQuery({
    name: 'Zeke',
    email: 'zeke@fullstackacademy.com',
    getMail: () => Promise.resolve(dbQuery([]))
  });
})

const doStuffWithMail = async(function* mailGenerator(id) {
  const user = yield getUser(id);
  const mail = yield user.getMail();
  const otherUserInfo = yield dbQuery(user, 44);
  return mail.map(() => {})
});

doStuffWithMail()
