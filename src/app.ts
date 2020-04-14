import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import mongoose from "mongoose";
import cors from "cors";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://mongo:27017/CRMdb';

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
