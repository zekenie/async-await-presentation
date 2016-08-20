const Message = {
  /** let's pretend this triggers an email
      and a db record for our in app message */
  create(msgObj, cb) {
    process.nextTick(() => {
      cb(null, msgObj);
    });
  }
}

class User {
  /** returns an instance of user
      perhaps the result of hitting the db?  */
  static findById(id, cb) {
    process.nextTick(() => {
      cb(null, new this({
        id,
        email: 'zeke@zeke.zeke',
        name: 'zeke'
      }));
    });
  }

  constructor(props) {
    Object.assign(this, props);
  }

  /** let's pretend this hit's gmail's server? */
  getContacts(cb) {
    process.nextTick(() => {
      cb(null, [
        new User({ email: 'friend@friend.friend' }),
        new User({ email: 'friend3@friend.friend' })
      ]);
    });
  }

  sendInvite(contact, message, cb) {
    Message.create({
      from: this,
      to: contact,
      message: "I'd like to add you to my professional network"
    }, cb);
  }
}


module.exports = {
  Message,
  User
}