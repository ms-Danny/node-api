const mongoose = require('mongoose');

const {Schema} = mongoose;

const Article = new Schema(
    {
        publishDate: {type: Date, default: new Date()},
        textAboveHeadline: { type: String },
        headline: { type: String },
        description: { type: String },
        author: { type: String },
        type: { type: String},
        readTime: {type: String}
    }
);

const ArticleTypes = {
    PressRelease: "Press release",
    CustomerStory: "Customer story"
}

module.exports = mongoose.model('Article', Article)