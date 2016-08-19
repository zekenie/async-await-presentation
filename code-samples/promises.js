const {User, Message} = require('async-await-presentation-strawpeople/promises');
function spamFriends(userId) {
  return User.findById(userId)
    .then(user => Promise.all([
      user,
      user.getGmailContacts()
    ])
    .then(weirdResults => {
      const [user, contacts] = weirdResults;

      const contactPromises = contacts.map(contact => Message.create({
        from: user,
        to: contact.email,
        message: "I'd like to add you to my professional network!"
      }));
      
      return Promise.all(contactPromises);
    }));
}

spamFriends(55).then(console.log, console.error);