const crypto = require('crypto')
exports.createRandomBytes = () => new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
            reject(err)
        }
        resolve(buf.toString('hex'))
    })
})