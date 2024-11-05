import { dbConnection } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import createNextResponse from "../util/createNextResponse";


async function verifyPassword(inputPassword, storedPasswordHash) {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
}

export async function POST(req) {
    try{
        await dbConnection();
        const requestBody = await req.json();
        const {username, password} = requestBody;

        const user = await User.findByUsername(username);

        if(!user){
            return createNextResponse(false, "Invalid Username or Password");
        }
        
        const isPasswordCorrect= await verifyPassword(password, user.password);

        if(!isPasswordCorrect){
            return createNextResponse(false, "Invalid Username or Password");
        }

        const tokenData = {
            username: user.username,
            id: user._id,
            role: user.role
        }        

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1h"});

        const response = NextResponse.json({
            success: true,
            message: "Logged in successfully",
            token: token,
            id: user._id,
            role: user.role
        })

        return response;

    }catch(e){
        console.log(e);
        return createNextResponse(false, "Internal Server Error");
    }
}