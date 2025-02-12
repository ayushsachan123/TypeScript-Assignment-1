import * as express from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import { Auth } from "../../middlewares/auth";
import { UsersController } from "../../controllers/users.controllers";

const router = express.Router();

router.get(
  "/all",
  Auth.BasicAuth,
  UsersController.getAllUsers
);

router.get(
  "/id/:id",
  Auth.BasicAuth,
  UsersController.getUserById)

router.get(
  "/me",
  Auth.BasicAuth,
  Auth.UserAuth,
  UsersController.getUserByToken
)

router.post(
    '/checkUserPresent',
    Auth.BasicAuth,
    celebrate({
        body: {
          email : Joi.string().required()
        },
      }),
    UsersController.checkUserPresent
)

router.post(
  "/create",
  Auth.BasicAuth,
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      walletAddress: Joi.string().optional().length(42),
      role : Joi.number().optional().min(0).max(1)
    },
  }),
  UsersController.createNewUser
);

router.post(
  "/login",
  Auth.BasicAuth,
  celebrate({
    body : {
      email : Joi.string().required(),
      password : Joi.string().required()
    }
  }),
  UsersController.login
)

router.put(
  "/update",
  Auth.BasicAuth,
  Auth.UserAuth,
  celebrate({
    body : {
      updates : Joi.object().required()
    }
  }),
  UsersController.updateUserDetails
)

router.delete(
  "/delete",
  Auth.BasicAuth,
  Auth.AdminAuth,
  celebrate({
    body : {
      email : Joi.string().required()
    }
  }),
  UsersController.deleteUser
)

router.use(errors());

module.exports = router;