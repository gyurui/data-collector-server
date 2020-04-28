import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { DataController } from "../controllers/dataController";
import {MeasurementController} from "../controllers/measurementController";

export class Routes {

    public contactController: UserController = new UserController()
    public dataController: DataController = new DataController()
    public measurementController: MeasurementController = new MeasurementController()

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: `ok`
                })
            })

        // Contact
        app.route('/user')
            .get(this.contactController.getUsers)
            .post(this.contactController.addNewUser);

        // Contact detail
        app.route('/user/:userId')
            // get specific contact
            .get(this.contactController.getUserWithID)
            .put(this.contactController.updateUser)
            .delete(this.contactController.deleteUser)

        app.route('/data')
            .get(this.dataController.getAllData)
            .post(this.dataController.addData)

        app.route('/startMeasurement')
            .post(this.dataController.setMeasurementId)

        app.route('/stopMeasurement')
            .get(this.dataController.clearMeasurementId)

        // Contact
        app.route('/measurement')
            .get(this.measurementController.getMeasurement)
            .post(this.measurementController.addNewMeasurement);

        // Contact detail
        app.route('/measurement/:measurementId')
            // get specific contact
            .get(this.measurementController.getMeasurementWithID)
            .put(this.measurementController.updateMeasurement)
            .delete(this.measurementController.updateMeasurement)
    }
}
