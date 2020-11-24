const mongoose = require('mongoose');

const {Schema} = mongoose;

const Article = new Schema(
    {
        textAboveHeadline: { type: String },
        headline: { type: String },
        description: { type: String },
        author: { type: String },
        type: { type: String},
        readTime: {type: String},
        publishDate: {type: Date, default: new Date()}
    }
);

const ArticleTypes = {
    PressRelease: "Press release",
    CustomerStory: "Customer story"
}

module.exports = mongoose.model('Article', Article)