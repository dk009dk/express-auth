const express = require('express');
const User = require('../../models/user.model');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const verifyJWT = require('../../middlewares/verifyJWT.middleware');

router.get('/hello', (req, res) => {
    res.send("Hello Express Auth")
});

router.post('/auth/login', userController.login);

router.post('/auth/register', userController.register);

router.get('/auth/user', verifyJWT, userController.getUser);    

//router.put('/auth/logout', verifyJWT, userController.logout);

module.exports = router;