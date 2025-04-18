import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/utils/models/User";


export async function GET(req) {
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error : "user not found or not authenticated"},
                {status : 401}
            );
        }
            await connect();

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get("page") || 1)
            const limit = parseInt(searchParams.get("limit") || 10);

            const skip = (page -1 ) * limit;

            const user = await User.findOne({email : session.user.email})

            if(!user){
                return NextResponse.json(
                    {error : "user not found or not authenticated"},
                    {status : 404}
                )
            }
            const totaItem = user.wishlist.length;
            const paginatedWishListIds = user.wishlist.slice(skip , skip * limit);

            const wishlistItems = await Product.find({
                _id: {$in : paginatedWishListIds}
            });

            return NextResponse.json({
                items : wishlistItems,
                 currentPage : page,
                 totalPages : Math.ceil(totaItem / limit),
                 hasMore : skip + limit < totaItem, 
            });
        
    }catch (error){
        return NextResponse.json(
            {error : "internal server error at the wishlist route"},
            {status  :500}
        )
    }
}
export async function PUT(req) {
    
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error : "user not found or not authenticated"},
                {status : 401}
            )
        }
        await connect();
        const {productId} = await req.json();
        if(!productId){
            return NextResponse.json(
                {error : "prod id not found"},
                {status : 404}
            )
        }
        const user = await User.findOne({email : session.user.email});
        if(!user){
            return NextResponse.json(
                {error : "user not found"},
                {status : 404}
            )
        }
 
        const product = await Product.findById(productId);
       
        if(!product){
            return NextResponse.json(
                {error : "user not found"},
                {status : 404}
            )
        }
        if(!user.wishlist.includes(productId)){
            user.wishlist.push(productId);
            await user.save();

        }
        return NextResponse.json({
            message : "product has been wishlisted"
        }, {status: 200})
    }catch(error){
        return NextResponse.json(
            {error : "internal server error at the wishlist route"},
            {status : 400}
        )
    }
}
export async function DELETE(req) {


    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error : "user not found or not authenticated"},
                {status : 401}
            )
        }
        await connect();
        const {productId} = await req.json();
        if(!productId){
            return NextResponse.json(
                {error : "prod id not found"},
                {status : 404}
            )
        }
        const user = await User.findOne({email : session.user.email});
        if(!user){
            return NextResponse.json(
                {error : "user not found"},
                {status : 404}
            )
        }
 
        const product = await Product.findById(productId);
       
        if(!product){
            return NextResponse.json(
                {error : "user not found"},
                {status : 404}
            )
        }
       user.wishlist = user.whislist.filter((id)=>id.toString() !==productId);

       await user.save();
       return NextResponse.json(
        {message :" product removed from wishlist "},
        {status : 200}
       )
    }catch (error){
        return NextResponse.json(
            {error : "internal server at the wishlist route"},
            {status : 500}
        )
    
    }
}