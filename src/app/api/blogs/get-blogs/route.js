import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { exposeRequiredData } from "../helper/helper";
import verifyToken from "../../util/verifyToken";

export async function GET(req){
    try{
        await dbConnection();
        const blogs = await Blog.findValid();
        const exposedBlogs = await exposeRequiredData(blogs);
        return NextResponse.json({
            blogs: exposedBlogs
        });
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
} 

export async function POST(req){
    try{
        const request = await req.json();
        const {token} = request;
        if(!token){
            return createNextResponse(false, "Token is required");
        }
        const {name, id, role} = verifyToken(token);
        console.log(id);
        await dbConnection();
        const blogs = await Blog.find({belongsTo: id, softDelete: false});
        console.log(blogs);
        const exposedBlogs = await exposeRequiredData(blogs);
        return NextResponse.json({
            name: name,
            role: role,
            blogs: exposedBlogs
        });
    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
} 