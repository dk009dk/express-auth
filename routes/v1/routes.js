const express = require('express');
const User = require('../../models/user.model');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const verifyJWT = require('../../middlewares/verifyJWT.middleware');
const { check, validationResult } = require('express-validator');

router.get('/hello', (req, res) => {
    res.send("Hello Express Auth")
});

router.post('/auth/login', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').exists()
], userController.login);

router.post('/auth/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').exists()
], userController.register);

router.get('/auth/user', verifyJWT, userController.getUser);    

//router.put('/auth/logout', verifyJWT, userController.logout);

module.exports = router;