const {User, Message} = require('async-await-presentation-strawpeople/promises');
const spamFriends = async(function* spamFriendsGenerator(userId) {
  const user = yield User.findById(userId);
  const gmailContacts = yield user.getGmailContacts();
  return yield Promise.all(gmailContacts.map(contact => Message.create({
    from: user,
    to: contact.email,
    message: `I'd like to add you to my professional network!`
  })));
})

spamFriends(55).then(console.log, console.error);




/** POLYFILL! */

function async(generatorFunc) {
  return function promiseChainBuilder() {
    /** create generator object */
    const generator = generatorFunc(...arguments);

    function continuer(valForGenerator) {
      let result = generator.next(valForGenerator);
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