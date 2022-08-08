const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: ''
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
    }
    next()
})

//adding custom method
userSchema.methods.comparePassword = async function (password) {
    const res = await bcrypt.compareSync(password, this.password)
    return res
}

module.exports = mongoose.model('User', userSchema);
