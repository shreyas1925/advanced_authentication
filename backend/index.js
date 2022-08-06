const express = require('express');

const app = express();

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>")
})

//request from frontend
app.post('/api/user/create', (req, res, next) => {
    next()
}, (req, res) => {
    res.send("okay")
})

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

