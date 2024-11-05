import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import verifyToken from "../../util/verifyToken";
import Blog from "@/models/blog";

export async function DELETE(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {id, token} = requestBody;

        const verificationObject = verifyToken(token);
        if (!verificationObject.isValid){
            return createNextResponse(false, "Deletion Failed, Token authentication failed");
        } 

        const blog = await Blog.findById(id);

        if(!blog){
            return createNextResponse(false, "Deletion Failed, Blog not found");
        }

        if ((verificationObject.role === "user" && verificationObject.id == blog.belongsTo) || verificationObject.role === "admin"){
            blog.updateOne({isDeleted: true});
            return createNextResponse(true, "Blog deleted successfully");
        }
        
        return createNextResponse(false, "Deletion Failed, User not authorized to delete this blog");
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
}