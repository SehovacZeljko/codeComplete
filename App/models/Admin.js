import User from './User';

class Admin extends User {
  constructor(id, name, email, adminLevel) {
    super(id, name, email);
    this.adminLevel = adminLevel;
  }

  createUser(users, user) {
    users.push(user);
  }

  deleteUser(users, userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }
}

export {Admin};
