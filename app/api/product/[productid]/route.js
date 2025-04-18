import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req, {params}) {
    await connect();
    const {productId}  = params;

    try{
        const product = await Product.findById(productId);
        if(!product){
            return NextResponse.json(
                {
                    error : " product not found" 
                },
                {status : 404}
            );

        }

        return NextResponse.json(product)
    }catch(error){
        return NextResponse.json(
            {error : "error fetching product"},
             {status: 500}
            )
    }
}
export async function PUT(req, {params}) {
    await connect();
    const {productId} = params
    const body = await req.json();
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, body,{
            new : true , runValidators: true
        })
        if(!updatedProduct){
            return NextResponse.json({
                error : "product not found"
            },
        {
            status : 404
        })
        }
        return NextResponse.json(updatedProduct);
    }catch (error){
        return NextResponse.json(
            {error : "error updating product"},
            {status : 500}
        )
    }
}
export async function DELETE( req , {params}) {
    await connect();
    const {productId} = params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return NextResponse.json({error : "Product not Found"}, {status:404});
   
        }

        return NextResponse.json({messgae : "product deleted successfully"});

    }catch(error){
        return NextResponse.json(
            {error : "error deleting product "},
            {status : 500}
        )
    }
}