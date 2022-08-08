const express = require('express');
require('./db');

const userRouter = require("./router/user");
const app = express();

const port = process.env.PORT || 8000


//before logic it works
app.use(express.json())
app.use('/api/user', userRouter)


app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

