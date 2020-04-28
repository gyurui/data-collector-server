import { Request, Response } from 'express';
import Data from "../models/dataModel";

interface PlotData {
    x: number;
    y: number;
}

export class DataController {
    public measurementId: string = "";
    public dataArray: PlotData[] = [{x: 0, y: 0}];

    public addNewData = (req: Request, res: Response) => {
        const newDataArray = JSON.parse(req.body.plotData);

        this.dataArray = newDataArray
        res.json({"success": true});
    }

    public getData = (req: Request, res: Response) => {
        res.json({"array": this.dataArray})
    }

    public setMeasurementId = (req: Request, res: Response) => {
        this.measurementId = req.body.measurementId;
        res.json({"measurementId": this.measurementId})
        console.log(req.body)
    }

    public clearMeasurementId = (req: Request, res: Response) => {
        this.measurementId = "";
        res.json({"message": "ok"})
    }

    public addData = (req: Request, res: Response) => {
        if (this.measurementId && !(this.measurementId === "")) {
            const data = {...req.body, ...{ "measurementId": this.measurementId }}
            console.log(data)
            const newData = new Data(data);
            newData.save((err, resData) => {
                if(err){
                    res.send(err);
                }
                res.json(resData);
            });
        } else {
            const error = {"error": "Wrong measurement id"};
            console.log(error)
            res.json(error);
        }
    }

    public getAllData(req: Request, res: Response) {
        Data.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteData (req: Request, res: Response) {
        Data.remove({ _id: req.params.dataId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }

}
