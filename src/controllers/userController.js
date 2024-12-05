// const User = require('../models/userModel');

// exports.getAllUsers = (req, res) => {
//   try {
//     const users = User.getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류 발생" });
//   }
// };

// exports.getUserById = (req, res) => {
//   try {
//     const user = User.getUserById(req.params.id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류 발생" });
//   }
// };

// exports.createUser = (req, res) => {
//   try {
//     const { name, email } = req.body;
//     if (!name || !email) {
//       return res.status(400).json({ message: "이름과 이메일은 필수입니다" });
//     }
//     const newUser = User.createUser({ name, email });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류 발생" });
//   }
// };

// exports.updateUser = (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const updatedUser = User.updateUser(req.params.id, { name, email });
//     if (updatedUser) {
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류 발생" });
//   }
// };

// exports.deleteUser = (req, res) => {
//   try {
//     const deletedUser = User.deleteUser(req.params.id);
//     if (deletedUser) {
//       res.status(200).json({ message: "사용자 삭제 완료", user: deletedUser });
//     } else {
//       res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류 발생" });
//   }
// };

const User = require('../models/userModel');
const Device = require('../models/deviceModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "사용자 생성 실패", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "사용자 업데이트 실패", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
    res.status(200).json({ message: "사용자 삭제 완료", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('owner', 'name email');
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id).populate('owner', 'name email');
    if (!device) {
      return res.status(404).json({ message: "기기를 찾을 수 없습니다" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.createDevice = async (req, res) => {
  try {
    const { name, type, serialNumber, owner, purchaseDate } = req.body;
    
    // 소유자 존재 여부 확인
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }

    const newDevice = new Device({ 
      name, 
      type, 
      serialNumber, 
      owner, 
      purchaseDate 
    });
    
    await newDevice.save();

    // 사용자의 devices 배열에 추가
    user.devices.push(newDevice._id);
    await user.save();

    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: "기기 생성 실패", error });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const { owner, ...updateData } = req.body;

    // 기존 기기 확인
    const existingDevice = await Device.findById(req.params.id);
    if (!existingDevice) {
      return res.status(404).json({ message: "기기를 찾을 수 없습니다" });
    }

    // 소유자 변경 시 처리
    if (owner && owner !== existingDevice.owner.toString()) {
      // 기존 소유자에서 기기 제거
      await User.findByIdAndUpdate(
        existingDevice.owner, 
        { $pull: { devices: existingDevice._id } }
      );

      // 새 소유자에게 기기 추가
      const newOwner = await User.findById(owner);
      if (!newOwner) {
        return res.status(404).json({ message: "새 소유자를 찾을 수 없습니다" });
      }
      newOwner.devices.push(existingDevice._id);
      await newOwner.save();
    }

    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id, 
      { ...updateData, owner: owner || existingDevice.owner }, 
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: "기기 업데이트 실패", error });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    
    if (!deletedDevice) {
      return res.status(404).json({ message: "기기를 찾을 수 없습니다" });
    }

    // 사용자의 devices 배열에서 기기 제거
    await User.findByIdAndUpdate(
      deletedDevice.owner, 
      { $pull: { devices: deletedDevice._id } }
    );

    res.status(200).json({ 
      message: "기기 삭제 완료", 
      device: deletedDevice 
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};

exports.getDevicesByUser = async (req, res) => {
  try {
    const devices = await Device.find({ owner: req.params.userId });
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
};