import { Request, Response } from 'express';

interface PlotData {
    x: number;
    y: number;
}

export class DataController {
    public dataArray: PlotData[] = [{x: 0, y: 0}];

    public addNewData = (req: Request, res: Response) => {
        const newDataArray = JSON.parse(req.body.plotData);

        this.dataArray = newDataArray

        res.json({"success": true});
    }

    public getData = (req: Request, res: Response) => {
        res.json({"array": this.dataArray})
    }

}
