import { Schema, model, Document } from "mongoose";
import { dateConstants } from "../utils/helpers";
import { USER_ROLES } from "../constants/userRoles";
import { DATABASE_NAMES } from "../constants/databaseNames";

export interface IUserModel extends Document {
  name: String;
  email: String;
  role: Number;
  password: String;
  walletAddress : String;
  createdOn: Number;
  updatedOn: Number;
}

export const UserSchema: any = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: Number, default: USER_ROLES.END_USER },
  password: { type: String },
  walletAddress : {type : String},
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
  updatedOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Users = model<IUserModel>(DATABASE_NAMES.USERS, UserSchema);