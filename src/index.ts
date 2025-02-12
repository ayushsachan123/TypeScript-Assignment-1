require("dotenv").config();
import * as mongoose from "mongoose";
import express from "express";
import * as bodyParser from "body-parser";
import { AppCreator } from "./interfaces/AppCreator";

export class App implements AppCreator {
  private static instance: App;
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  async initializeServer() {
    try{
      this.connectWithDatabase()
        await this.loadMiddlewares()
        this.loadEndpoints()
        this.start()
    } catch(e){
        console.log(e)
    }
  }

  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private async loadMiddlewares() {
    // parse application/json
    this.app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,User-Agent, X-Requested-With, content-type,Content-Type, authtoken, access_token, access-token, Accept, authorization"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, GET, DELETE, OPTIONS"
      );
      console.log(`${req.method} ${req.originalUrl} (${new Date()})`)

      if ("OPTIONS" === req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  private connectWithDatabase(){
    const server = '127.0.0.1:27017'
    const database = 'rateItUp'

    mongoose.connect(`mongodb://${server}/${database}`)
    .then(() => {
        console.log('Database connection successfull')
    }).catch((err:any) => {
        console.log('Database connection error : ' + err)
    })
  }

  private loadEndpoints(){
    this.app.use("/api/v1/users", require('./routes/v1/user.routes'))
  }

  private start() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  }
}