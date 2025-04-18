import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import  Review  from "@/utils/models/Review";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Order from "@/utils/models/Order";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json(
               {canReview : false},
               {status : 202}
            );
        }
        const productId =  SearchParamsContext.get("productId");

        if(!productId){
            return NextResponse.json(
                {error : "invalid product id"},
                {status : 400}
            );
        }
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return NextResponse.json(
                {error : " invalid product id"},
                {status : 400}
            )
        }
        const ObjectIdProductId = new mongoose.Types.ObjectId(productId);

        const hasPurchased = await Order.findOne({
            user : session.user._id,
            "cartProducts.product" : ObjectIdProductId,
            status: "delivered",
            paid : true
        })
        if(!hasPurchased){
            console.log("user has not purchased the product");

            return NextResponse.json({
                canReview: !hasPurchased
            }, {status : 200})
        }

        const hasReviewed = await Review.findOne({
            user: session.user._id,
            product : ObjectIdProductId
        })
        return NextResponse.json({canReview: !hasReviewed}, {status : 200});
    }catch(error){
        return NextResponse.json(
            {error  : "internal server at the review api rout"}
        )
    }
}