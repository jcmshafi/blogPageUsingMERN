const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    content: {
        type: String,
    },
    img : {
        type: String,
    },

    comments: {
        type: String,
    }



},
    { timestamps: true, versionKey: false } )

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog

