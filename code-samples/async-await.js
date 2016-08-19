const {User, Message} = require('async-await-presentation-strawpeople/promises');
async function spamFriends(userId) {
  const user = await User.findById(userId);
  const gmailContacts = await user.getGmailContacts();
  return await Promise.all(gmailContacts.map(contact => Message.create({
    from: user,
    to: contact.email,
    message: `I'd like to add you to my professional network!`
  })));
}

spamFriends(55).then(console.log, console.error);