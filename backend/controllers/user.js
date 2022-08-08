const User = require('../model/userSchema');

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