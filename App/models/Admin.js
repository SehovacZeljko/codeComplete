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
  updateAdminLevel(newLevel) {
    const validLevels = ['LevelOne', 'LevelTwo', 'LevelThree'];
    if (validLevels.includes(newLevel)) {
      this.adminLevel = newLevel;
      console.log(`Admin level updated to ${this.adminLevel}`);
    } else {
      console.error(
        'Invalid admin level. Please choose from "LevelOne", "LevelTwo", or "LevelThree".',
      );
    }
  }
}

export default Admin;
