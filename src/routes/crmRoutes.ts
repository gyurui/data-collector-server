import {Request, Response, NextFunction} from "express";
import {ContactController} from "../controllers/crmController";
import {DataController} from "../controllers/dataController";

export class Routes {

    public contactController: ContactController = new ContactController()
    public dataController: DataController = new DataController()

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: `GET SUCEESSS AND ${this.contactController.lastId}`
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
            .get(this.dataController.getData)
            .post(this.dataController.addNewData)
    }
}
