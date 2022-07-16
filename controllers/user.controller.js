const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const AUTH_SECRET = process.env.AUTH_SECRET;

exports.getUser = async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
}

exports.login = async (req, res) => {
    const { email, password } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, AUTH_SECRET, { expiresIn: '1h' });
    res.status(200).json({'msg' : 'success' , token });
}

exports.register = async (req, res) => {
    const { name, email, password } = req.query;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
        name,
        email,
        password : hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, AUTH_SECRET, { expiresIn: '1h' });
    res.status(201).json({'msg' : 'success', token });
}