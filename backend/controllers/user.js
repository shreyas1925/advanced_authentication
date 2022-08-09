const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const { generateOTP, transportMail, mailTemplate, plainmailTemplate } = require('../utils/mail');
const VerificationToken = require('../model/verificationToken');
const { isValidObjectId } = require('mongoose');
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

    // generate an otp

    const OTP = generateOTP()

    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    })

    await verificationToken.save()
    await newUser.save()

    transportMail().sendMail({
        from: 'emailverification@email.com',
        to: newUser.email,
        subject: "Verify your email account",
        html: mailTemplate(OTP)
    })
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

exports.verifyEmail = async (req, res) => {

    const { userId, otp } = req.body

    if (!userId || !otp.trim()) return res.status(400).json({ success: false, error: 'UserId and otp is required' })

    if (!isValidObjectId(userId)) { return res.status(400).json({ success: false, error: 'Invalid userId' }) }

    const user = await User.findById(userId)

    if (!user) { return res.status(400).json({ success: false, error: 'User does not exist' }) }

    if (user.verified) { return res.status(200).json({ success: false, error: 'User already verified' }) }

    const token = await VerificationToken.findOne({ owner: user._id })

    if (!token) { return res.status(400).json({ success: false, error: 'User not found' }) }

    const isMatched = await token.compareToken(otp)

    if (!isMatched) { return res.status(400).json({ success: false, error: 'Invalid otp' }) }

    user.verified = true

    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    transportMail().sendMail({
        from: 'emailverification@email.com',
        to: user.email,
        subject: "Verify your email account",
        html: plainmailTemplate("Email Verified successfully", "Thanks for connecting with us")
    })

    res.status(200).json({ success: true, message: 'Email verified successfully', user: { name: user.name, email: user.email, userId: user._id } })

}