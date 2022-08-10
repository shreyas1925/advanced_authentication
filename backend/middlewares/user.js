const { isValidObjectId } = require("mongoose");
const ResetToken = require("../model/resetToken");
const User = require("../model/userSchema");

exports.isResetTokenValid = async (req, res, next) => {

    const { token, id } = req.query;
    if (!token || !id) { return res.status(400).json({ success: false, error: 'Invalid request' }) }

    if (!isValidObjectId(id)) { return res.status(400).json({ success: false, error: 'Invalid userId' }) }

    const user = await User.findById(id)

    if (!user) { return res.status(404).json({ success: false, error: 'User not found' }) }

    const resetToken = await ResetToken.findOne({ owner: user._id })
    if (!resetToken) { return res.status(404).json({ success: false, error: 'Token not found' }) }

    const isMatched = await resetToken.compareToken(token)
    if (!isMatched) { return res.status(400).json({ success: false, error: 'Reset token is invalid' }) }

    req.user = user
    next()
}