import { dbConnection } from "@/lib/db";
import User from "@/models/user";
import createNextResponse from "../../util/createNextResponse";
import Joi from "joi";
import verifyToken from "../../util/verifyToken";
import Blog from "@/models/blog";


export async function PUT(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {id, title, content, token} = requestBody;

        const verificationObject = verifyToken(token);
        if (!verificationObject.isValid){
            return createNextResponse(false, "Invalid Token, Please Login Again");
        }
        
        const blog = await Blog.findById(id);

        if (!blog) {
            return createNextResponse(false, "Blog not found");
        }
        if (verificationObject.id == blog.belongsTo){
            let changedBlog = blog
            changedBlog.title = title
            changedBlog.content = content
            changedBlog.save()
            return createNextResponse(true, "Blog updated successfully");
        }
        return createNextResponse(false, "Update Failed, User not authorized to update this blog");
    }catch(e){
        return createNextResponse(false, "Internal Server Error");
    }
}
