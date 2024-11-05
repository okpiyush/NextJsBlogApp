import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    comment: String,
    softDelete: {
        type: Boolean,
        default: false
    },
    commentOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

CommentSchema.statics.findByPost = async function (id) {
    return this.find({ commentOf: id, softDelete: false });
}

const Comment = mongoose.models.Comment || mongoose.model('Comment',CommentSchema)

export default Comment;