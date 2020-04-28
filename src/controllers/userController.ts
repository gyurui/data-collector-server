import { Request, Response } from 'express';
import User from "../models/userModel";

export class UserController {
    public addNewUser (req: Request, res: Response) {
        const newContact = new User(req.body);
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getUsers (req: Request, res: Response) {
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithID = (req: Request, res: Response) =>  {
        User.findById(req.params.userId, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser (req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteUser (req: Request, res: Response) {
        User.remove({ _id: req.params.userId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!'});
        });
    }
}
