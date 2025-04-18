import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import User from "@/utils/models/User";



export async function PUT(req) {
    try{
        await connect();
        const {email, name , newEmail} = await req.json();
        const updateUser = await User.findOneAndUpdate({
            email
        },{name , email : newEmail}, {new : true})

        if(!updateUser){
            return NextResponse.json({error : "user not found"} , {status : 404});
        }

        return NextResponse.json({
            message : "user updated sucessfully",
            user : updateUser
        })

    }catch (error){
        return NextResponse.json(
            {error : "internal server error at the update references route"},
            {status: 500}
        )
    }

}