const {
  User,
  Message
} = require('async-await-presentation-strawpeople/promises');

const spamFriends = async(function* spamFriendsGen(userId) {
  const user = yield User.findById(userId);
  const contacts = yield user.getContacts();
  const promises = contacts
    .map(contact => user.sendInvite(contact));
  return yield Promise.all(promises);
})

spamFriends(55) // <- Promise

/** POLYFILL! */
function async(generatorFn) {
  return function wrapper() {
    /** create generator object */
    const generator = generatorFn(...arguments);

    function continuer(val) {
      let result = generator.next(val);
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