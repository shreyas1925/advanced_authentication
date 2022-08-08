const express = require('express');
require('./db');
const User = require('./model/userSchema');
const app = express();

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>")
})

//before logic it works
app.use(express.json())

//(req, res, next) => {
// req.on('data', (chunk) => {
//     req.body = chunk
//     next() 
// })
//}, 

//request from frontend
app.post('/api/user/create', (req, res) => {
    const { name, email, password } = req.body
    const newUser = new User({
        name,
        email,
        password,
    })
    res.send(newUser)
})

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

