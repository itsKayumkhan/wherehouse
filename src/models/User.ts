import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the user document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    
});

// Create the model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
