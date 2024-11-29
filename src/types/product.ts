import mongoose, { Document } from "mongoose";

export interface productT{
    img:string,
    name:string,
    price:string,
    description:string,
    quantity?:number,
    reviews?:{
        rating:number,
        user:string,
        photo:string,
        comment:string
    }
}

export interface ShippingInfoI {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNo: string;
  }


 export interface PaymentInfoI {
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
    razorpaySignature?: string;
    status: string;
  }
  export interface IOrder extends Document {
    shippingInfo: ShippingInfoI;
    orderItems: productT[];
    user: mongoose.Schema.Types.ObjectId | string;
    paymentInfo?: PaymentInfoI;
    paidAt?: Date;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    deliveredAt?: Date;
    createdAt: Date;
  }
