import { IUserModel, Users } from "../models/users.model";
import { MongoDao } from "../daoLayer/mongoDao";
import { SUCCESS } from "../constants/succes";
import { ERROR } from "../constants/error";
import * as bcrypt from "bcrypt";
import { createJwtToken, verifyJwtToken } from "../utils/helpers";
import { AnyARecord } from "dns";
require('dotenv').config();

const usersDao = new MongoDao<IUserModel>(Users);

export const UsersController = {
  createNewUser: async (req: any, res: any) => {
    try {
      let encryptedPassword = await bcrypt.hash(req.body.password, 10);
      let newUser = req.body;
      newUser.password = encryptedPassword;
      await usersDao.create(newUser);
      res.status(SUCCESS.POST_201.code).json(SUCCESS.POST_201);
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  getUserById: async (req: any, res: any) => {
    try {
      let id = req.params["id"];
      let data = await usersDao.findOne(id);
      res.status(SUCCESS.GET_200.code).json({ result: data });
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  getAllUsers: async (req: any, res: any) => {
    try {
      let result = await usersDao.findAll({
        email: 1,
        name: 1,
        _id: 0,
        role: 1,
      });
      res.status(SUCCESS.GET_200.code).json({ result: result });
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  getUserByToken : async (req: any, res : any) => {
    try{
      let token = req.headers[<string>process.env.JWT_HEADER_KEY]
      let tokenData = await verifyJwtToken(token)
      res.status(SUCCESS.GET_200.code).send({result : tokenData})
     } catch (err : any){
      res
          .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
          .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
     }
  },
  checkUserPresent: async (req: any, res: any) => {
    try {
      let user = await usersDao.findOneByFields({ email: req.body.email });
      if (user && user.length != 0) {
        res.status(SUCCESS.GET_200.code).json({ result: true });
      } else {
        res.status(SUCCESS.GET_200.code).json({ result: false });
      }
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  login: async (req: any, res: any) => {
    try {
      let user = await usersDao.findOneByFields({ email: req.body.email });
      if (!user || user.length == 0) {
        return res
          .status(ERROR.USER_DOESNOT_EXISTS.code)
          .send(ERROR.USER_DOESNOT_EXISTS);
      }
      let passwordMatched = await bcrypt.compare(
        req.body.password,
        <string>user[0].password
      );
      if (!passwordMatched) {
        return res
          .status(ERROR.INCORRECT_PASSWORD.code)
          .send(ERROR.INCORRECT_PASSWORD);
      }
      let signedToken = await createJwtToken({
        id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        password: user[0].password,
      });
      return res
        .status(SUCCESS.LOGIN_SUCCESSFULL.code)
        .json({ token: signedToken });
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  updateUserDetails : async(req:any, res:any) => {
   try{
    let token = req.headers[<string>process.env.JWT_HEADER_KEY]
    let tokenData = await verifyJwtToken(token)
    let updates = req.body.updates
    if(updates.email){
      return res.status(ERROR.EMAIL_CANNOT_BE_UPDATED.code).send(ERROR.EMAIL_CANNOT_BE_UPDATED)
    }
    if(updates.password){
      updates.password = await bcrypt.hash(updates.password, 10)
    }
    await usersDao.update({_id : tokenData.id}, updates)
    res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA)
   } catch (err : any){
    res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
   }
  },
  deleteUser: async (req:any, res:any) => {
    try {
      let email = req.body.email;
      let deletedUser = await usersDao.delete({email : email})
      if (deletedUser) {
        res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
      } else {
        res.status(SUCCESS.NOT_FOUND.code).send("User not found!");
      }
    } catch (err:any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  }
};
