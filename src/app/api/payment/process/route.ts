import dbConnect from "@/config/dbConnect";
import ApiResponse from "@/lib/ApiResponse";
import Order from "@/models/Order";
import { NextRequest } from "next/server";
import Razorpay from "razorpay";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET,
});
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { ordersData } = await req.json();

    // Create a new order
    const orderOptions = {
      amount: ordersData.totalPrice * 100,
      currency:   "INR",
    };

    const order = await instance.orders.create(orderOptions);
    const newOrder = new Order({...ordersData, paymentInfo: { razorpayPaymentId: "", razorpayOrderId: order.id, razorpaySignature: "", status: "pending" }});

    await newOrder.save();
  return   ApiResponse({
      success: true,
      status: "200",
      message: "Order created successfully",
      data: order,
    })
  } catch (error) {
    return ApiResponse({
      success: false,
      status: "400",
      message: "Order creation failed",
      error: error,
    });
  }
}

// shippingInfo: shippingInfo,
// orderItems: orderItems,
// user: userId,
// paymentInfo: {
//   razorpayPaymentId: "",
//   razorpayOrderId: order.id,
//   razorpaySignature: "",
//   status: "pending",
// },
// paidAt: null,
// itemsPrice,
// taxPrice: 0,
// shippingPrice: shippingPrice,
// totalPrice: amount,
// orderStatus: "Processing",
// deliveredAt: null,
// }
