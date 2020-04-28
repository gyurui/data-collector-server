import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { DataController } from "../controllers/dataController";
import {MeasurementController} from "../controllers/measurementController";

export class Routes {

    public contactController: ContactController = new ContactController()
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
        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)

        app.route('/data')
            .get(this.dataController.getAllData)
            .post(this.dataController.addData)

        app.route('/data/measurementId')
            .get(this.dataController.clearMeasurementId)
            .post(this.dataController.setMeasurementId)

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
