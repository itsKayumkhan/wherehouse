import jwt  from 'jsonwebtoken';
import ApiResponse from "@/lib/ApiResponse";
import { NextRequest } from "next/server"
import User from '@/models/User';
import bcrypt from 'bcrypt';
import dbConnect from '@/config/dbConnect';



export async function POST(req: NextRequest) {
    try {
        await dbConnect();        const { email, password } = await req.json();
        if (!email || !password) return ApiResponse({ success: false, status: '400', message: 'Email or Password not found' });

        const user = await User.findOne({ email });
        if (!user) return ApiResponse({ success: false, status: '400', message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return ApiResponse({ success: false, status: '400', message: 'Invalid credentials' });

        const tokenData = jwt.sign(
            { email: user.email, id: user._id },
            process.env.NEXT_PUBLIC_JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        const userObject = user.toObject();
        userObject.password = '';
        // const { password:pass, ...userWithoutPassword } = userObject;

        return ApiResponse({ success: true, status: '200', message: 'Login successfully', data: { user: userObject, token: tokenData } });
    }
    catch (error) {
        console.log(error);
        return ApiResponse({ success: false, status: '400', message: 'Login : Something went wrong ' });

    }


}
