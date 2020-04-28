import mongoose, { Schema, Document } from "mongoose";
import { User } from "@src/models/userModel";

export interface Measurement extends Document {
    name: string;
    ownerUser: User["_id"];
    description: string;
}

export const MeasurementSchema = new Schema({
    name: {
        type: String,
        required: "Enter a measurement name",
    },
    ownerUser: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
    },
});

export default mongoose.model<Measurement>("Measurement", MeasurementSchema);
