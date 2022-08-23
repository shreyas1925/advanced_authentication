const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const { generateOTP, transportMail, mailTemplate, plainmailTemplate, resetPasswordTemplate, emailTemplate } = require('../utils/mail');
const VerificationToken = require('../model/verificationToken');
const { isValidObjectId } = require('mongoose');
const resetToken = require('../model/resetToken');
require('dotenv').config();

const crypto = require('crypto');
const { createRandomBytes } = require('../utils/helper');

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
        subject: "Email Verified successfully",
        html: plainmailTemplate("Email Verified successfully", "Thanks for connecting with us")
    })

    res.status(200).json({ success: true, message: 'Email verified successfully', user: { name: user.name, email: user.email, userId: user._id } })

}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email.trim()) {
        return res.status(400).json({ success: false, error: 'Email is required' })

    }

    const user = await User.findOne({ email })
    if (!user) { return res.status(404).json({ success: false, error: 'User not found invalid request' }) }

    const token = await resetToken.findOne({ owner: user._id })

    if (token) { return res.status(200).json({ error: "Only after one hour you can request another token" }) }

    const randomToken = await createRandomBytes()

    const ResetToken = new resetToken({ owner: user._id, token: randomToken })
    await ResetToken.save()

    transportMail().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: "Reset your password",
        html: resetPasswordTemplate(
            "Please click on the link below to reset your password",
            `http://localhost:3000/reset-password?token=${randomToken}&id=${user._id}`
        )
    })

    res.json({ success: true, message: "Password reset link is ent to your email" })

}

exports.resetPassword = async (req, res) => {

    const { password } = req.body
    const user = await User.findById(req.user._id)
    if (!user) { return res.status(404).json({ success: false, error: 'User not found invalid request' }) }

    const isSamePassword = await user.comparePassword(password)
    if (isSamePassword) {
        return res.status(400).json({ success: false, error: 'New password should not be same as old password' })
    }

    if (password.trim().length < 8 || password.trim().length > 20) {
        return res.status(400).json({ success: false, error: 'Password should be between 8 to 20 characters' })
    }

    user.password = password.trim()
    await user.save()

    await resetToken.findOneAndDelete({ owner: user._id })

    transportMail().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: "Password Reset Successfully!!",
        html: emailTemplate("Password Reset Successfully!!", "Now login with your new Password")
    })

    res.json({ success: true, message: "Password Reset Successfully" })

}