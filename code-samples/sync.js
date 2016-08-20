const {
  User,
  Message
} = require('async-await-presentation-strawpeople/sync');

function spamFriends(userId) {
  const user = User.findById(userId);
  const contacts = user.getContacts();
  return contacts.map(function(contact) {
    return user.sendInvite(contact);
  });
}

console.log(spamFriends(55));