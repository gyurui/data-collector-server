import mongoose, { Schema, Document } from 'mongoose';


export interface Data extends Document {
    gyroscopeX?: number;
    gyroscopeY?: number;
    gyroscopeZ?: number;
    accelerometerX?: number;
    accelerometerY?: number;
    accelerometerZ?: number;
    batteryLevel?: number;
    gpsLatitude?: number;
    gpsLongitude?: number;
    sendDate: Date;
    createdDate?: Date;
    measurementId: string;
}

export const DataSchema = new Schema({
    gyroscopeX: {
        type: Number,
    },
    gyroscopeY: {
        type: Number,
    },
    gyroscopeZ: {
        type: Number,
    },
    accelerometerX: {
        type: Number,
    },
    accelerometerY: {
        type: Number,
    },
    accelerometerZ: {
        type: Number,
    },
    batteryLevel: {
        type: Number,
    },
    gpsLatitude: {
        type: String
    },
    gpsLongitude: {
        type: String
    },
    sendDate: {
        type: Date,
        required: true,
    },
    measurementId: {
        type: String,
        required: true,
        default: "rossz",
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, { collection: 'data' });

export default mongoose.model<Data>('Data', DataSchema);
