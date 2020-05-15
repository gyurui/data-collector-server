import mongoose, { Schema, Document } from "mongoose";

export interface SensorData {
    leftDesiredSpeed?: number;
    leftMeasuredSpeed?: number;
    leftPidSignal?: number;
    rightDesiredSpeed?: number;
    rightMeasuredSpeed?: number;
    rightPidSignal?: number;
    carRealSpeed?: number;
    rotationRatio?: number;
    gyroscopeX?: number;
    gyroscopeY?: number;
    gyroscopeZ?: number;
    accelerometerX?: number;
    accelerometerY?: number;
    accelerometerZ?: number;
    magnetometerX?: number;
    magnetometerY?: number;
    magnetometerZ?: number;
    pressure?: number;
    batteryLevel?: number;
    gpsLatitude?: number;
    gpsLongitude?: number;
}

export interface Data extends Document {
    measuredValues: SensorData;
    sendDate: Date;
    createdDate?: Date;
    measurementId: string;
}

export const DataSchema = new Schema(
    {
        measuredValues: {
            leftDesiredSpeed: {
                type: Number,
            },
            leftMeasuredSpeed: {
                type: Number,
            },
            leftPidSignal: {
                type: Number,
            },
            rightDesiredSpeed: {
                type: Number,
            },
            rightMeasuredSpeed: {
                type: Number,
            },
            rightPidSignal: {
                type: Number,
            },
            carRealSpeed: {
                type: Number,
            },
            rotationRatio: {
                type: Number,
            },
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
            magnetometerX: {
                type: Number,
            },
            magnetometerY: {
                type: Number,
            },
            magnetometerZ: {
                type: Number,
            },
            batteryLevel: {
                type: Number,
            },
            pressure: {
                type: Number,
            },
            gpsLatitude: {
                type: String,
            },
            gpsLongitude: {
                type: String,
            },
        },
        sendDate: {
            type: Date,
            required: true,
        },
        measurementId: {
            type: String,
            required: true,
            default: "bad measurement id",
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "data" },
);

export default mongoose.model<Data>("Data", DataSchema);
