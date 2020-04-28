import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    phone?: number;
    isAdmin: boolean;
    createdDate?: Date;
}

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: "Enter a first name",
    },
    lastName: {
        type: String,
        required: "Enter a last name",
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    phone: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<User>("User", ContactSchema);
