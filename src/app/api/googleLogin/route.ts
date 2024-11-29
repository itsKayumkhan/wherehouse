import User from '@/models/User';
import axios from 'axios';
import { google } from 'googleapis';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from '@/config/dbConnect';
import ApiResponse from '@/lib/ApiResponse';

const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    'postmessage'
);

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const code = req.nextUrl.searchParams.get('code');
        if (!code) return ApiResponse({ success: false, status: '400', message: 'Code not found' });

        const token = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(token.tokens);

        const { data: { email, name, id: googleId } } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.tokens.access_token}`
        );

        let user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(googleId, 10);
            user = await User.create({ email, name, password: hashedPassword });
        }

        const tokenData = jwt.sign(
            { email: user.email, id: user._id },
            process.env.NEXT_PUBLIC_JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;

        return ApiResponse({ success: true, status: '200', message: 'Login successfully', data: { user: userWithoutPassword, token: tokenData } });

    } catch (error) {
        console.error(error);
        return ApiResponse({ success: false, status: '500', message: 'Error in Login' ,data:{error}});
    }
}
