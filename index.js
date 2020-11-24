const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db = mongoose.connect('mongodb://localhost/articlesdb');
const Article = require('./models/Article');
const articleRouter = require('./routes/articleRouter')(Article);
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', articleRouter)

app.get('/', (req, res) => {
    res.send('welcome to my test API!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
