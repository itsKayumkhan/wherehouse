import ApiResponse from "@/lib/ApiResponse";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const key = process.env.RAZORPAY_KEY;

  if (!key) {
    return ApiResponse({
      success: false,
      status: "500",
      message: "Razorpay key not found",
      data: null,
    });
  }
  return ApiResponse({
    success: true,
    status: "200",
    message: "Razorpay key fetched successfully",
    data: key,
  });
}
