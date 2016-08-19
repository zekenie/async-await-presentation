const {User, Message} = require('async-await-presentation-strawpeople/callbacks');
function spamFriends(userId, callback) {
  User.findById(userId, function whenUserFound(err, user) {
    if(err) { return callback(err); }
    user.getGmailContacts(function whenContactsFound(err, contacts) {
      if(err) { return callback(err); }
      const messageResults = [];
      contacts.forEach(function forEachContact(contact) {
        Message.create({
          from: user,
          to: contact.email,
          message: "I'd like to add you to my professional network!"
        }, function whenMessageMade(err, message) {
          if(err) { return callback(err); }
          messageResults.push(message);
          if(messageResults.length === contacts.length) {
            callback(null, messageResults);
          }
        })
      })
    })
  });
}

spamFriends(55, function whenFriendsSpammed(err, results) {
  if(err) {
    return console.error("Captain, we've got a problem")
  }
  console.log(results);
});