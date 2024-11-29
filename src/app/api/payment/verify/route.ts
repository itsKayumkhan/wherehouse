import dbConnect from "@/config/dbConnect";
import ApiResponse from "@/lib/ApiResponse";
import Order from "@/models/Order";
import crypto from 'crypto';
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        await dbConnect();
          // Send payment details to the server for verification
          const { orderId, paymentId, signature } = await req.json();

        //   const response = await instance.payments.fetch(paymentId);

          const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!);
          shasum.update(`${orderId}|${paymentId}`);

          if (shasum.digest('hex') === signature) {

            const updatedOrder = await Order.findOneAndUpdate(
              { 'paymentInfo.razorpayOrderId': orderId },
              {
                $set: {
                  'paymentInfo.razorpayPaymentId': paymentId,
                  'paymentInfo.razorpaySignature': signature,
                  'paymentInfo.status': 'success',
                  paidAt: new Date(),
                },
              },
              { new: true }
            );

            if (!updatedOrder) {
              console.log('Order not found');
              return ApiResponse({ success: false, status: '400', message: "Order not found" });
            }

            console.log('Payment verification successful');
          return  ApiResponse({ success: true, status: '200', message: "Payment verification successful" });
          } else {
            // Payment verification failed
            console.log('Payment verification failed');
            return ApiResponse({ success: false, status: '400', message: "Payment verification failed" });
          }
    } catch (error) {
        return ApiResponse({ success: false, status: '400', message: "Error creating order", error });
    }
}
