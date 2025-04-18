import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req) {
    await connect();

    try {
        const featuredProduct = await Product.find({featured : true});
        return NextResponse.json(featuredProduct);



    }catch(error){
        return NextResponse.json(
            {error : "error fetching featured product"},
            {status : 505}
        )
    }
}

export async function PUT(req , {params}) {
    await connect();
    const {productId} = params;
    try {
        const updatedFeaturedProducts=await Product.updateMany({featured : true}, {featured : false})

        console.log("all the products feature false", updatedFeaturedProducts)

        
        const updatedProduct = await Product.findByIdAndUpdate(productId , {featured: true }, {new : true})

        console.log("only the seleted product is featured ", updatedProduct )
        
        
    if(!updatedProduct){
        return NextResponse.json( 
             {error : "error finding featured product"},
            {status : 404})
    }
     return NextResponse.json(updatedProduct)
    
    }
    catch (error){
        return NextResponse.json(
            {error : "error finding featured product"},
            {status : 500}
        )
    }

}