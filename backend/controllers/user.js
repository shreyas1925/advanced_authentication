const User = require('../model/userSchema');
const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ success: false, error: 'User already exists' })
    }

    const newUser = new User({
        name,
        email,
        password,
    })

    await newUser.save()
    res.send(newUser)
}

exports.signin = async (req, res) => {

    const { email, password } = req.body

    if (!email.trim() || !password.trim()) {
        return res.status(403).json({ success: false, error: 'Email and password is required' })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ success: false, error: 'User does not exist' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Incorrect credentials' })
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    // const token = user.generateAuthToken()

    res.json({ success: true, user: { name: user.name, email: user.email, password: user.password, token } })

    // res.send(token)

}