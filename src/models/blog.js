import mongoose from "mongoose";
import User from "./user";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    softDelete: {
        type: Boolean,
        default: false
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

BlogSchema.statics.findValid = async function() {
    const blogs = await this.find({ softDelete: false })
    return blogs;
};


const Blog = mongoose.models.Blog || mongoose.model('Blog',BlogSchema)

export default Blog;