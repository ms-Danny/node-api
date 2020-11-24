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
    .put((req, res) => {
        Article.findById(req.params.articleId, (err, article) => {
            if(err) {
                return res.send(err);   
            }
                article.textAboveHeadline = (req.body.textAboveHeadline != "") ? req.body.textAboveHeadline : article.textAboveHeadline;
                article.headline = (req.body.headline != "") ? req.body.headline : article.headline;
                article.description = (req.body.description != "") ? req.body.description : article.description;
                article.author = (req.body.author != "") ? req.body.author : article.author;
                article.type = (req.body.type != "") ? req.body.type : article.type;
                article.readTime = (req.body.readTime != "") ? req.body.readTime : article.readTime;
                //console.log(article)
                article.save();
                return res.json(article);
        });
    })
    return articleRouter;
}

module.exports = routes