import User from './User';

class Admin extends User {
  constructor(id, name, email, adminLevel) {
    super(id, name, email);
    this.adminLevel = adminLevel;
  }

  createUser(users, newUser) {
    return [...users, newUser];
  }

  deleteUser(users, userId) {
    return users.filter(user => user.id !== userId);
  }
}

export default Admin;
