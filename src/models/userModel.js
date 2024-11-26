class User {
    constructor() {
      this.users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
      ];
    }
  
    getAllUsers() {
      return this.users;
    }
  
    getUserById(id) {
      return this.users.find(user => user.id === parseInt(id));
    }
  
    createUser(user) {
      const newUser = {
        id: this.users.length + 1,
        ...user
      };
      this.users.push(newUser);
      return newUser;
    }
  
    updateUser(id, updatedUser) {
      const index = this.users.findIndex(user => user.id === parseInt(id));
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
        return this.users[index];
      }
      return null;
    }
  
    deleteUser(id) {
      const index = this.users.findIndex(user => user.id === parseInt(id));
      if (index !== -1) {
        return this.users.splice(index, 1)[0];
      }
      return null;
    }
  }
  
  module.exports = new User();