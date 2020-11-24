const express = require('express');

function routes(Article) {
    const articleRouter = express.Router();
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
    return articleRouter;
}

module.exports = routes