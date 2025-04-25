const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    file_id: {
        type: String,
        required: [true, 'Please add a episode id'],
    },
    user_id: {
        type: String,
        required: [true, 'Please add a user id'],
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
module.exports = mongoose.model('Comment', CommentSchema);