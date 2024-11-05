import User from "@/models/user";
import Blog from "@/models/blog";
import Comment from "@/models/comments";
export async function exposeRequiredData(data) {
    const userIds = data.map((blog) => blog.belongsTo);

    const users = await User.find({ _id: { $in: userIds } }).lean(); 
    const userMap = {};

    users.forEach((user) => {
        userMap[user._id] = user.username; 
    });

    return data.map((blog) => {
        return {
            title: blog.title,
            id: blog._id,
            commentsLen: blog.comments.length,
            username: userMap[blog.belongsTo] || 'Unknown'
        };
    });
}

export async function getBlogData(id) {
    const blog = await Blog.findById(id);
    const exposedBlog = await exposeRequiredData([blog]);
    const comments = await Comment.findByPost(blog._id);
    const user = await User.findById(blog.belongsTo).lean().username;

    return {
        blog: exposedBlog[0],
        blogResponse:{
            title: exposedBlog[0].title,
            content: blog.content,
            id: exposedBlog[0].id,
            belongsTo: blog.belongsTo,
            comments: comments.map((comment) => {
                return {
                    comment: comment.comment,
                    user: user
                };
            }),
            username: exposedBlog[0].username
        }
    }
}
