const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/articlesdb');
const Article = require('./models/Article');
const port = process.env.PORT || 3000;

const articleRouter = express.Router();

articleRouter.route('/articles')
    .get((req, res) => {
        const query = {};
        if(req.query.author){
            query.author = req.query.author;
        }
        Article.find(query, (err, articles) => {
            if(err) {
                return res.send(err);   
            }
                return res.json(articles);
        });
    })

    articleRouter.route('/articles/:articleId')
    .get((req, res) => {
        Article.findById(req.params.articleId, (err, article) => {
            if(err) {
                return res.send(err);   
            }
                return res.json(article);
        });
    })
app.use('/api', articleRouter)

app.get('/', (req, res) => {
    res.send('welcome to my test API!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
console.log('test')