import { Request, Response } from "express";
import Measurement from "../models/measurementModel";

export class MeasurementController {
    public addNewMeasurement(req: Request, res: Response) {
        new Measurement(req.body).save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getMeasurement(req: Request, res: Response) {
        Measurement.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getMeasurementWithID = (req: Request, res: Response) => {
        Measurement.findById(req.params.measurentID, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };

    public updateMeasurement(req: Request, res: Response) {
        Measurement.findOneAndUpdate({ _id: req.params.measurentID }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteMeasurement(req: Request, res: Response) {
        Measurement.deleteOne({ _id: req.params.measurementId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted contact!" });
        });
    }
}
