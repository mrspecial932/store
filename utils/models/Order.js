import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {
        type : String ,
        required : [true , "please provide customers name" ],

    },
    email : {
        type : String ,
        required : [true , " please Provide customers email"],
    },
    city :{
        type : String ,
        required :[true , "plase provide customers city"],
    },
    postalCode:{
            type : String,
            required :[true , "Please provide postal code"],
    },
    streetAddress :{
        type : String,
        required:[true , "please provide customer address" ]
    },
    country :{
        type : "please provide customers country"
    },
    paid :{
        type: Boolean,
        default:false
    },
    cartProducts :[{
      product :{type: mongoose.Schema.Types.ObjectId, ref:"Product"}  ,
      price: Number,
    }],
    updatedAt:{
        type : Date,
        default: Date.now
    },
    status :{
        type : String,
        enum : [
            "processsing",
            "pending",
            "shipped",
            "delivered",
            "cancelled",
            "payment_failed"
        ],
        default: "pending",
    },
    total :{
        type: Number,
        required:[true, "must have a total number" ] 
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;