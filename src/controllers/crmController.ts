import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import {ContactSchema} from "../models/crmModel";
const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
    public lastId = "We dont have any ID yet";

    public addNewContact (req: Request, res: Response) {
        const newContact = new Contact(req.body);

        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContacts (req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContactWithID = (req: Request, res: Response) =>  {
        // Contact.findById(req.params.contactId, (err, contact) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
        this.lastId = req.params.contactId.toString();
        res.json({"hello": req.params.contactId});
    }

    public updateContact (req: Request, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact (req: Request, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}
