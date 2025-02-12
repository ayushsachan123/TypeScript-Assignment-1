import auth from "basic-auth";
import {USER_ROLES} from "../constants/userRoles"
import { sendError, copyObject, verifyJwtToken } from "../utils/helpers";
import { ERROR } from "../constants/error";
require("dotenv").config()

export class Auth {
  static async BasicAuth(req: any, res: any, next: () => void) {
    // extract the name and password from basic authorization
    let credentails = auth(req);

    // verify the authorization credentials
    if (
      credentails &&
      credentails.name === <string>process.env.BASIC_AUTH_USER &&
      credentails.pass === <string>process.env.BASIC_AUTH_PASSWORD
    ) {
      next();
    } else {
      sendError(res, ERROR.UNAUTHORIZED_401);
    }
  }

  static async UserAuth(req: any, res: any, next: () => void) {
    try {
      if (!req.header(process.env.JWT_HEADER_KEY)) {
        let errorData = copyObject(ERROR.UNAUTHORIZED_401);
        return res.status(errorData.code).send(errorData);
      }
      let token = req.header(process.env.JWT_HEADER_KEY);
      let tokenData = await verifyJwtToken(token).catch((error: any) => {
        console.log("Error while verifying user auth token", error);
        throw ERROR.UNAUTHORIZED_401;
      });

      if (!tokenData) throw ERROR.UNAUTHORIZED_401;
      req.tokenData = tokenData;
      next();
    } catch (err) {
      console.log(err);
      let errorData = copyObject(ERROR.UNAUTHORIZED_401);
      return res.status(errorData.code).send(errorData);
    }
  }

  static async AdminAuth(req: any, res: any, next: () => void) {
    try {
      if (!req.header(process.env.JWT_HEADER_KEY)) {
        let errorData = copyObject(ERROR.UNAUTHORIZED_401);
        return res.status(errorData.code).send(errorData);
      }
      let token = req.header(process.env.JWT_HEADER_KEY);
      let tokenData = await verifyJwtToken(token).catch((error: any) => {
        console.log("Error while verifying user auth token", error);
        throw ERROR.UNAUTHORIZED_401;
      });

      if (!tokenData) throw ERROR.UNAUTHORIZED_401;
      req.tokenData = tokenData;
      if(tokenData.role != USER_ROLES.ADMIN){
        let errorData = copyObject(ERROR.ADMIN_UNAUTHORISED);
        return res.status(errorData.code).send(errorData);
      }
      next();
    } catch (err) {
      console.log(err);
      let errorData = copyObject(ERROR.UNAUTHORIZED_401);
      return res.status(errorData.code).send(errorData);
    }
  }
}
