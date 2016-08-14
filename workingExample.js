function async(generatorFunc) {
  return function() {
    function continuer(verb, arg) {
      var result;
      try {
        result = generator[verb](arg);
      } catch (err) {
        return Promise.reject(err);
      }
      if (result.done) {
        return result.value;
      } else {
        return Promise.resolve(result.value).then(onFulfilled, onRejected);
      }
    }
    var generator = generatorFunc(...arguments);
    var onFulfilled = continuer.bind(continuer, "next");
    var onRejected = continuer.bind(continuer, "throw");
    return onFulfilled();
  }
}

const getUser = id => Promise.resolve({
  name: 'Zeke',
  email: 'zeke@fullstackacademy.com',
  getMail: () => Promise.resolve([])
});

const doStuffWithMail = async(function*(id) {
  const user = yield getUser(id);
  const mail = yield user.getMail();
  return mail.map(() => {})
});

doStuffWithMail().then(console.log).catch(console.error);
