const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/device/', userController.getAllDevices);
router.get('/device/:id', userController.getDeviceById);
router.post('/device/', userController.createDevice);
router.patch('/device/:id', userController.updateDevice);
router.delete('/device/:id', userController.deleteDevice);
router.get('/device/user/:userId', userController.getDevicesByUser);

module.exports = router;