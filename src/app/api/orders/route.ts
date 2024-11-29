import ApiResponse from "@/lib/ApiResponse";
import Order from "@/models/Order";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON from the request body
    const { orders } = await req.json();

    // Create a new order in the database
    const newOrder = new Order(orders); // Instantiate the Order model with provided data
    const savedOrder = await newOrder.save(); // Save the order to the database

    ApiResponse({ success: true, status: '200', message: "Order created", data: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    ApiResponse({ success: false, status: '400', message: "Error creating order" });
  }
}
