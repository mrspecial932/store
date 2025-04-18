import connect from "@/utils/config/dbConnection";
import Order from "@/utils/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);   
const webhookScret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    
    await connect();

    let event;

    try {
        const body = await req.json();

        const signature = req.headers.get("stripe-signature");

        event = stripe.webhooks.constructEvent(body, signature, webhookScret);
        console.log("webhook event contructed successfully", signature);

    }catch(error){
        return NextResponse.json(
            {error : "Internal server error at the webhook route"},
            {status : 500}
        );
    }
    switch(event.type){
        case "checkout.session.completed":
        const session = event.data.object;
        await handleSuccessfulPayment(session);
        break;
        case "payment_intent.succeeded" :
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;

        default :
        console.log(`Unhandeled event type ${event.type}`);

    }
    return NextResponse.json(
        {recieved : true}, {status: 200}
    )
}
async function handleSuccessfulPayment(paymentObject) {
    let orderId;
    if(paymentObject.object === "checkout.session"){
        orderId = paymentObject.metadata.orderId
    }else if(paymentObject.object=== "payment_intent"){
        orderId = paymentObject.metadata.orderId;

    }
    if(!orderId){
        console.log("no order id found");
        return ;
    }
    try {

        const updateOrder = await Order.findByIdAndUpdate(orderId, {
            paid : true , status: "delivered"
        }, {new : true})
        if(!updateOrder){
            console.log("no order found with this  id ${orderId}")
            return
        }
        console.log(`Order &{orderId} updated : paid= true , status : delivered `)
    }catch (error){
        console.error(`error updating order ${orderId}`, error)
    }
    
}