const express = require('express');
const app = express();
const { router } = require('./Users/Router');
const cors = require("cors")
app.use(cors({
    // origin:["http://localhost:8000/students/login", ""]
    origin: "*"
}))

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT


app.use(express.json());
app.use('/students', router)

app.listen(port, () => {
    console.log('server is running....');
});



