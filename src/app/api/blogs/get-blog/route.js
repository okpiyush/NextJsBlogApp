import { dbConnection } from "@/lib/db";
import createNextResponse from "../../util/createNextResponse";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import mongoose from "mongoose";
import { getBlogData } from "../helper/helper";

export async function GET(req) {
    try {
        await dbConnection();   
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id || !mongoose.isValidObjectId(id)) {
            return createNextResponse(false, "Correct Blog ID is required");
        }
        
        const {blog, blogResponse} = await getBlogData(id);


        if (!blog) {
            return createNextResponse(false, "Blog not found");
        }

        return NextResponse.json({
            status: 200,
            data:blogResponse
        });
    } catch (e) {
        console.error(e);
        return createNextResponse(false, "Internal Server Error");
    }
}
