require('dotenv').config(); //grabs password from .env file
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connect to the Cloud
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Not Connected To The Database:", err));

// settngs and reading the data from middleware
app.set('view engine', 'ejs');
app.use(express.static('Sources'));
app.use('/css', express.static('css'));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get('/', (req, res) => {
    res.render('index');
});


const PORT = 3001;
app.listen(PORT, () => {
    app.listen(3001, () => console.log(`http://localhost:3001`));
});