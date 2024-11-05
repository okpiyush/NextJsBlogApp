import { NextResponse } from "next/server";

export default function createNextResponse(successInput, messageInput, token= null ,redirectUrl = null) {
    const response = {
        success: successInput,
        message: messageInput,
    }
    if(token){
        response["token"] = token;
    }

    if (redirectUrl) {
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.json(response);
}