class User {
  /** returns an instance of user
      perhaps the result of hitting the db?  */
  static findById(id) {
    return Promise.resolve(new this({
      id,
      email: 'zeke@zeke.zeke',
      name: 'zeke'
    }));
  }

  constructor(props) {
    Object.assign(this, props);
  }

  /** let's pretend this hit's gmail's server? */
  getGmailContacts() {
    return Promise.resolve([
      new User({ email: 'friend@friend.friend' }),
      new User({ email: 'friend3@friend.friend' })
    ])
  }
}

const Message = {
  /** let's pretend this triggers an email
      and a db record for our in app message */
  create(msgObj) {
    return Promise.resolve(msgObj);
  }
}

module.exports = {
  Message,
  User
};