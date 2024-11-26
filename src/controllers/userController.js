const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  try {
    const users = User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

exports.getUserById = (req, res) => {
  try {
    const user = User.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

exports.createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "이름과 이메일은 필수입니다" });
    }
    const newUser = User.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

exports.updateUser = (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = User.updateUser(req.params.id, { name, email });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const deletedUser = User.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: "사용자 삭제 완료", user: deletedUser });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};