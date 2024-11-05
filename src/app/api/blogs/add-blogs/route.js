import { dbConnection } from "@/lib/db";
import User from "@/models/user";
import createNextResponse from "../../util/createNextResponse";
import Joi from "joi";
import verifyToken from "../../util/verifyToken";
import Blog from "@/models/blog";

const addNewBlog = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    belongsTo: Joi.string().required()
})

export async function POST(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {title, content, token} = requestBody;

        const verificationObject = verifyToken(token);
        if (!verificationObject.isValid){
            return createNextResponse(false, "Invalid Token, Please Login Again");
        } 
        // jsut for a check of the details of a user (will slow down the app but make the addition of the blogs more secure)
        const user = await User.findById(verificationObject.id)

        if(!user){
            return createNextResponse(false, "User not found");
        }

        const {error} = addNewBlog.validate({title, content, belongsTo: verificationObject.id});
        if (error){
            return createNextResponse(false, error.details[0].message);
        }
        
        const newBlog = {
            title: title,
            content: content,
            belongsTo: verificationObject.id
        }

        const blog = Blog.create(newBlog);
        return createNextResponse(true, "Blog added successfully");
    }catch(e){
        return createNextResponse(false, "Internal Server Error");
    }
}