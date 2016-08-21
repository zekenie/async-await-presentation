const {
  User,
  Message
} = require('async-await-presentation-strawpeople/promises');

function spamFriends(userId) {
  return User.findById(userId)
    .then(function(user) {
      return Promise.all([
        user,
        user.getContacts()
      ]);
    })
    .then(function(weirdResults) {
      const [user, contacts] = weirdResults;
      const promises = contacts
        .map(contact => user.sendInvite(contact));
      
      return Promise.all(promises);
    });
}

spamFriends(55) // <- Promise
