import { Request, Response, Application } from "express";
import { UserController } from "../controllers/userController";
import { DataController } from "../controllers/dataController";
import { MeasurementController } from "../controllers/measurementController";
import { check } from "express-validator";
import { Authentication } from "../middleware/authentication";
import puppeteer from "puppeteer";
import * as fs from "fs";

export class Routes {
    public contactController: UserController = new UserController();
    public dataController: DataController = new DataController();
    public measurementController: MeasurementController = new MeasurementController();
    public authentication: Authentication = new Authentication();

    public routes(app: Application): void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "ok",
            });
        });

        app.route("/generateReport").get((req: Request, res: Response) => {
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto("https://dms-admin.herokuapp.com/");
                await page.emulateMediaType("screen");
                const date = new Date().toISOString().split(":").join("").split(".").join("");
                const pdfName = `report_${date}.pdf`;
                await page.pdf({
                    path: `./pdf/${pdfName}`, // path (relative to CWD) to save the PDF to.
                    printBackground: true, // print background colors
                    width: "612px", // match the css width and height we set for our PDF
                    height: "792px",
                });
                await browser.close();

                const data = fs.readFileSync(`./pdf/${pdfName}`);
                res.contentType("application/pdf");
                res.status(200).send(data);
            })();
        });

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "ok",
            });
        });

        app.post(
            "/signUp",
            [
                check("userName", "Please Enter a Valid Username").not().isEmpty(),
                check("email", "Please enter a valid email").isEmail(),
                check("password", "Please enter a valid password, minimum 6 long string").isLength({
                    min: 6,
                }),
            ],
            this.contactController.signUp,
        );

        app.post(
            "/login",
            [
                check("email", "Please enter a valid email").isEmail(),
                check("password", "Please enter a valid password, minimum 6 long string").isLength({
                    min: 6,
                }),
            ],
            this.contactController.login,
        );

        // Contact
        app.get("/user", this.authentication.auth, this.contactController.getUsers);
        app.route("/user").post(this.contactController.addNewUser);

        // Contact detail
        app.route("/user/:userId")
            // get specific contact
            .get(this.contactController.getUserWithID)
            .put(this.contactController.updateUser)
            .delete(this.contactController.deleteUser);

        app.route("/data").get(this.dataController.getAllData).post(this.dataController.addData);

        app.route("/data/measurement").get(this.dataController.getDataWithMeasurementId);

        app.route("/startMeasurement").post(this.dataController.setMeasurementId);

        app.route("/stopMeasurement").get(this.dataController.clearMeasurementId);

        // Contact
        app.route("/measurement").get(this.measurementController.getMeasurement).post(this.measurementController.addNewMeasurement);

        // Contact detail
        app.route("/measurement/:measurementId")
            // get specific contact
            .get(this.measurementController.getMeasurementWithID)
            .put(this.measurementController.updateMeasurement)
            .delete(this.measurementController.deleteMeasurement);
    }
}
