// class User {
//   constructor() {
//     this.users = [
//       { id: 1, name: "John Doe", email: "john@example.com" },
//       { id: 2, name: "Jane Smith", email: "jane@example.com" }
//     ];
//   }

//   getAllUsers() {
//     return this.users;
//   }

//   getUserById(id) {
//     return this.users.find(user => user.id === parseInt(id));
//   }

//   createUser(user) {
//     const newUser = {
//       id: this.users.length + 1,
//       ...user
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   updateUser(id, updatedUser) {
//     const index = this.users.findIndex(user => user.id === parseInt(id));
//     if (index !== -1) {
//       this.users[index] = { ...this.users[index], ...updatedUser };
//       return this.users[index];
//     }
//     return null;
//   }

//   deleteUser(id) {
//     const index = this.users.findIndex(user => user.id === parseInt(id));
//     if (index !== -1) {
//       return this.users.splice(index, 1)[0];
//     }
//     return null;
//   }
// }

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
// module.exports = new User();