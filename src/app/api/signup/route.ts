import ApiResponse from "@/lib/ApiResponse";
import { NextRequest } from "next/server";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from "@/config/dbConnect";


export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { email, password, name } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ApiResponse({ success: false, status: '400', message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        const tokenData = jwt.sign({ userId: newUser._id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' });

        const userObject = newUser.toObject();
         userObject.password = '';

        return ApiResponse({
            success: true,
            status: '200',
            message: 'User created and logged in successfully',
            data: { user: userObject, token: tokenData }
        });

    } catch (error) {
        console.log(error);
        return ApiResponse({ success: false, status: '400', message: 'Signup: Something went wrong' });
    }
}
