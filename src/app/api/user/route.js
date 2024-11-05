import { dbConnection } from "@/lib/db";
import User from "@/models/user";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import createNextResponse from "../util/createNextResponse";

const AddNewUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function POST(req) {
    try {
        await dbConnection();
        const extractUserInfo = await req.json();
        const { username, password } = extractUserInfo;

        const { error } = AddNewUser.validate({ username, password });
        if (error) {
            return createNextResponse(false, error.details[0].message);
        }

        const hashPasswordResult = await hashPassword(password);

        const newUser = {
            username: username,
            password: hashPasswordResult,
        };

        const newlyCreatedUser = await User.create(newUser);

        if (newlyCreatedUser) {
            return createNextResponse(true, "User added successfully");
        } else {
            return createNextResponse(false, "User not added");
        }
    } catch (e) {
        console.log(e.message);
        return createNextResponse(false, "Internal Server Error");
    }
}


