import {NextResponse} from "next/server"
import dbConnect from "@/utils/config/dbConnection"
import Order from "@/utils/models/Order"
import {Product} from "@/utils/models/Product"

export async function GET(request, {params} ) {
  const {orderId} = params;

  await dbConnect();

  try {

    const order = await Order.findById(orderId).populate({
        path : "cartProducts",
        model : Product,
    });
    if(!Order){
        return NextResponse.json({
            error : "failed to fetch order",
        },
        {
        status : 404
        });
    }
    return NextResponse.json(order)
  }catch (error){
    console.log("Error fetching Order:", error);
    return NextResponse.json({
         error : "Internal sever error at api/order/[orderid]"
    }, {
      status: 500
  })
  }
}
