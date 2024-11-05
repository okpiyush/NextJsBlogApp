import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { exposeRequiredData } from "../helper/helper";

export async function GET(req){
    try{
        await dbConnection();
        const blogs = await Blog.findValid();
        const exposedBlogs = exposeRequiredData(blogs);
        return NextResponse.json({
            blogs: exposedBlogs
        });
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
} 