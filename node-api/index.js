const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db = mongoose.connect('mongodb://localhost/articlesdb');
const Article = require('./models/Article');
const port = process.env.PORT || 3000;

const articleRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', articleRouter)

articleRouter.route('/articles')

    .post((req, res) => {
        const article = new Article(req.body);
        console.log('posting');
        console.log(article);

        article.save();
        return res.status(201).json(article)
    }) 

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



app.get('/', (req, res) => {
    res.send('welcome to my test API!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
console.log('test')