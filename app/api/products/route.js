import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req , res) {
    await connect();

    const foundProducts = await Product.find({}).populate("user").sort({createdAt : -1})

    if(foundProducts){
        return NextResponse.json(foundProducts);

    }else{
        return new NextResponse(
          {  error: "cannot find products"},
          {status : 500}  
        )
    }   
}
export async function POST(req , res) {
    await connect();

    const body = await req.json();

    const {
             name ,
            description ,
            images ,
            brand ,
            material ,
            orginalPrice,
            bracelet,
            price ,
            condition ,
            users,
            movement,
            thickness,
            glass ,
            luminova ,
            casematerial ,
            crown,
            bandSize,
            lugs,
            water
    } = body

    const newProduct = await Product.create({
            name ,
            description ,
            images ,
            brand ,
            material ,
            orginalPrice,
            bracelet,
            price ,
            condition ,
            users,
            movement,
            thickness,
            glass ,
            luminova ,
            casematerial ,
            crown,
            bandSize,
            lugs,
            water
    });
    console.log("new product created" , newProduct);
    const savedProduct = await newProduct.save();

    return NextResponse.json({
        message : "Product created sucessfully",
        sucess : true,
        savedProduct
    })
}