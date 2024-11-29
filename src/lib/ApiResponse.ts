import { NextResponse } from "next/server";

interface ApiResponseI {
    success: boolean;
    status: string;
    message: string;
    data?: any;
    error?: any;
}

const ApiResponse = ({
    success,
    status,
    message,
    data = {},
    error = {}
}: ApiResponseI) => {
    return NextResponse.json({ success, message, data, error }, { status: parseInt(status) });
};

export default ApiResponse;
