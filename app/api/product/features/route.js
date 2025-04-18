import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req) {
    await connect();

    try {
        const featuredProduct = await Product.findOne({featured : true});

        if(!featuredProduct){
            return NextResponse.json(
                {error : "error fetching fetching product"},
                {status : 500}
            )
        }
        return NextResponse.json(featuredProduct);



    }catch(error){
        return NextResponse.json(
            {error : "error fetching featured product", 
                error : error.error.toString() },
            {status : 505}
        )
    }
}