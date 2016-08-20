const Message = {
  /** let's pretend this triggers an email
      and a db record for our in app message */
  create(msgObj) {
    return msgObj;
  }
}

class User {
  /** returns an instance of user
      perhaps the result of hitting the db?  */
  static findById(id) {
    return new this({
      id,
      email: 'zeke@zeke.zeke',
      name: 'zeke'
    });
  }

  constructor(props) {
    Object.assign(this, props);
  }

  /** let's pretend this hit's gmail's server? */
  getContacts() {
    return [
      new User({ email: 'friend@friend.friend' }),
      new User({ email: 'friend3@friend.friend' })
    ];
  }

  sendInvite(contact, message) {
    return Message.create({
      from: this,
      to: contact,
      message: "I'd like to add you to my professional network"
    });
  }
}


module.exports = {
  Message,
  User
};