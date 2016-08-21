const {
  User,
  Message
} = require('async-await-presentation-strawpeople/callbacks');

function spamFriends(userId, cb) {
  User.findById(userId, function userFound(err, user) {
    if(err) { return cb(err); }
    user.getContacts(function contactsFound(err, contacts) {
      if(err) { return cb(err); }
      const messageResults = [];
      contacts.forEach(function eachContact(contact) {
        user.sendInvite(contact, function(err, message) {
          if(err) { return cb(err); }
          messageResults.push(message);
          if(messageResults.length === contacts.length) {
            cb(null, messageResults);
          }
        });
      })
    })
  });
}

spamFriends(55, function friendsSpammed(err, results) {
  if(err) {
    return console.error("Captain, we've got a problem")
  }
  results; // <- Yay
});