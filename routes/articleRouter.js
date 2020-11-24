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
    articleRouter.use('/articles/:articleId', (req, res, next) => {
        Article.findById(req.params.articleId, (err, article) => {
            if(err) {
                return res.send(err);   
            }
            if(article){
                req.article = article
                return next();
            }
            return res.sendStatus(404);
        });
    })
    articleRouter.route('/articles/:articleId')
    .get((req, res) => res.json(req.article))
    .put((req, res) => {
        const {article} = req;
        article.textAboveHeadline = (req.body.textAboveHeadline != "") ? req.body.textAboveHeadline : article.textAboveHeadline;
        article.headline = (req.body.headline != "") ? req.body.headline : article.headline;
        article.description = (req.body.description != "") ? req.body.description : article.description;
        article.author = (req.body.author != "") ? req.body.author : article.author;
        article.type = (req.body.type != "") ? req.body.type : article.type;
        article.readTime = (req.body.readTime != "") ? req.body.readTime : article.readTime;
        //console.log(article)
        req.article.save((err) => {
            if(err){
                return res.send(err);
            }
            return res.json(article);
        });
    })
    .patch((req, res) => {
        const {article} = req;
        if(req.body._id) {
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            article[key] = value;
        });
        req.article.save((err) => {
            if(err){
                return res.send(err);
            }
            return res.json(article);
        });
    })
    .delete((req, res) =>{
        req.article.remove((err) => {
            if(err) {
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    });

    return articleRouter;
}

module.exports = routes
