import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import verifyToken from "../../util/verifyToken";
import Blog from "@/models/blog";
import Comment from "@/models/comments";

export async function DELETE(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {id, token} = requestBody;

        const verificationObject = verifyToken(token);
        if (!verificationObject.isValid){
            return createNextResponse(false, "Deletion Failed, Token authentication failed");
        } 
        console.log(id);
        console.log(verificationObject);
        const comment = await Comment.findById(id);
        console.log(comment);

        if(!comment){
            return createNextResponse(false, "Deletion Failed, Comment not found");
        }

        if ((verificationObject.role === "user" && verificationObject.id == comment.belongsTo) || verificationObject.role === "admin"){
            var updatedComment = comment;
            updatedComment.softDelete=true;
            await updatedComment.save();
            return createNextResponse(true, "Blog deleted successfully");
        }
        
        return createNextResponse(false, "Deletion Failed, User not authorized to delete this blog");
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
}