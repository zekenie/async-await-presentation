const {
  User,
  Message
} = require('async-await-presentation-strawpeople/promises');

async function spamFriends(userId) {
  const user = await User.findById(userId);
  const contacts = await user.getContacts();
  const promises = contacts
    .map(function(contact) {
      return user.sendInvite(contact);
    });
  return await Promise.all(promises);
}

spamFriends(55); // <- Promise