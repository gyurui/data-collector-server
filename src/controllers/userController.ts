import { Request, Response } from "express";
import User from "../models/userModel";
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class UserController {
    public addNewUser(req: Request, res: Response) {
        const newContact = new User(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithID = (req: Request, res: Response) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.remove({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted user!" });
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    public async signUp(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email,
            });

            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists",
                });
            }

            user = new User(req.body);

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000,
                },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                    });
                },
            );
            return;
        } catch (err) {
            console.log(err.message);
            return res.status(500).send("Error in Saving");
        }
    }

    public async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                email,
            });
            if (!user || email === undefined || password === undefined)
                return res.status(400).json({
                    message: "User Not Exist",
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !",
                });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                    });
                },
            );
            return;
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
}
