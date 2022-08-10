const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const resetTokenSchema = new mongoose.Schema({
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '36000s',
        default: Date.now()
    }

})

resetTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hash = await bcrypt.hash(this.token, 10)
        this.token = hash
    }
    next()
})

//adding custom method
resetTokenSchema.methods.compareToken = async function (token) {
    const res = await bcrypt.compareSync(token, this.token)
    return res
}

module.exports = mongoose.model('resetToken', resetTokenSchema);

