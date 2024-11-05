import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import Joi from "joi";
import verifyToken from "../../util/verifyToken";
import Comment from "@/models/comments";
import Blog from "@/models/blog";

const addNewComment = Joi.object({
    comment: Joi.string().required(),
    commentOf: Joi.string().required(),
    belongsTo: Joi.string().required()
})

export async function POST(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {comment, commentOf, token} = requestBody;

        const verificationObject = verifyToken(token);
        if (!verificationObject.isValid){
            return createNextResponse(false, "Invalid Token, Please Login Again");
        } 

        const {error} = addNewComment.validate({comment, commentOf, belongsTo: verificationObject.id});
        if (error){
            return createNextResponse(false, error.details[0].message);
        }
        
        const newComment = {
            comment: comment,
            commentOf: commentOf,
            belongsTo: verificationObject.id,
        }

        const currComment = Comment.create(newComment);
        return createNextResponse(true, "Comment added successfully");
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
}