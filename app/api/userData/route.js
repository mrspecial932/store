import connect from "@/utils/config/dbConnection";
import User from "@/utils/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
    
    await connect();

    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json(
            {error : "user not found or not authorized"},
            {status : 401}
        )
    }

    await connect();

    try {
     const user  = await User.findOne({email : session.user.email}).select("-password");
     if(!user){
        return NextResponse.json(
            {error : "user not found or not authorized"},
            {status : 401}
        )
     }
     return NextResponse.json(
        user
    )   
        
    }catch (error){
        return NextResponse.json(
            {error : "Internal server error at the  user data route"},
            {status : 500}
        )
    }
}