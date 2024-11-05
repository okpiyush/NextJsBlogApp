import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import verifyToken from "../../util/verifyToken";
import Comment from "@/models/comments";

export async function PUT(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {id, comment, token} = requestBody;

        const verificationObject = verifyToken(token);
        console.log(verificationObject)
        if (!verificationObject.isValid){
            return createNextResponse(false, "Invalid Token, Please Login Again");
        }
        
        const storedComment = await Comment.findById(id);

        if (!storedComment) {
            return createNextResponse(false, "comment not found");
        }
        if (verificationObject.id == storedComment.belongsTo){
            let changedComment = storedComment
            changedComment.comment = comment
            console.log(changedComment)
            changedComment.save()
            return createNextResponse(true, "Comment updated successfully");
        }
        return createNextResponse(false, "Update Failed, User not authorized to update this comment");
    }catch(e){
        console.log(e)
        return createNextResponse(false, "Internal Server Error");
    }
}
