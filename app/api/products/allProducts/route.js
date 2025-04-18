import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async  function GET(req){
    await connect();

    const {searchParams}= new Url(req.url);
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit" || 12));

    const skip = (page -1) * limit;

    try {
        const totalProducts = await Product.countDocuments({});
        const foundProducts = await Product.find({}).populate("user").sort({createdAt : 1 }).skip(skip).limit(limit);

        if(foundProducts){
            return NextResponse.json({
                product : foundProducts,
                total : totalProducts,
                page : page,
                totalPages: Math.ceil(totalProducts / limit),
            })  
        }else {
            return new NextResponse.json({error : "products not found"}, {status : 404})
        }
        
    }
    catch (error){
        return new NextResponse.json(
            {
                error : "error fetching products"
            },
            {
                status : 500
            }
        )
    }
}