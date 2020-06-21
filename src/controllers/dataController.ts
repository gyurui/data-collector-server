import { Request, Response } from "express";
import Data from "../models/dataModel";
import latex from "node-latex";
import fs from "fs";

interface PlotData {
    x: number;
    y: number;
}

export class DataController {
    public measurementId = "";
    public dataArray: PlotData[] = [{ x: 0, y: 0 }];

    public addNewData = (req: Request, res: Response) => {
        this.dataArray = JSON.parse(req.body.plotData);
        res.json({ success: true });
    };

    public getData = (req: Request, res: Response) => {
        res.json({ array: this.dataArray });
    };

    public setMeasurementId = (req: Request, res: Response) => {
        this.measurementId = req.body.measurementId;
        res.json({ measurementId: this.measurementId });
        console.log(req.body);
    };

    public clearMeasurementId = (req: Request, res: Response) => {
        this.measurementId = "";
        res.json({ message: "ok" });
    };

    public addData = (req: Request, res: Response) => {
        if (this.measurementId && !(this.measurementId === "")) {
            const data = { ...req.body, ...{ measurementId: this.measurementId } };
            console.log(data);
            new Data(data).save((err, resData) => {
                if (err) {
                    res.send(err);
                }
                res.json(resData);
            });
        } else {
            const error = { error: "Wrong measurement id" };
            console.log(error);
            res.json(error);
        }
    };

    public getAllData(req: Request, res: Response) {
        Data.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }

    public getDataWithMeasurementId = (req: Request, res: Response) => {
        Data.find({ measurementId: req.query.measurementId }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    };

    public deleteData(req: Request, res: Response) {
        Data.remove({ _id: req.params.dataId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted contact!" });
        });
    }

    public getLatex(req: Request, res: Response) {
        Data.find({}, async (err, data) => {
            if (err) {
                res.send(err);
            }

            const source = `
                \\documentclass{article}
                \\usepackage[utf8]{inputenc}
                \\usepackage{pgfplots}


                \\title{Universe}
                \\author{gyuri.trum }
                \\date{May 2020}

                \\usepackage{natbib}
                \\usepackage{graphicx}
                \\usepackage{listings}

                \\begin{document}

                \\maketitle

                \\section{Introduction}
                There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable.
                There is another theory which states that this has already happened.

                \\section{Conclusion}
                \`\`I always thought something was fundamentally wrong with the universe''

                \\section{Data}


                \\bibliographystyle{plain}
                \\bibliography{references}
                \\end{document}
                `;

            const input = fs.createReadStream("./latex/main.tex");
            const output = fs.createWriteStream("./latex/output.pdf");
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const pdf = latex(input);

            await pdf.pipe(output);
            pdf.on("error", (error: Error) => console.error(error));
            pdf.on("finish", () => {
                console.log("PDF generated!");

                const generatedPdf = fs.readFileSync("./latex/output.pdf");
                res.contentType("application/pdf");
                res.status(200).send(generatedPdf);
            });
        });
    }
}
