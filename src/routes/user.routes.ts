import { Router } from "express";
import userController from "../controllers/userController";
import userServices from "../controllers/services/userServices";
import HandleValidation from "../services/validation/servicesValidation/HandleValidation";
import HandleRules from "../services/validation/rules/Rules";

const routerUser = Router();

routerUser.get("/", userController.findAll);
routerUser.get(
  "/:id",
  userServices.verifyJWT,
  userServices.verifyIdExists,
  userController.findById
);
routerUser.post(
  "/",
  HandleRules.bodyRulesRegister,
  HandleValidation.verifyValitadion,
  userServices.verifyEmailExsits,
  userController.create
);
routerUser.put(
  "/:id",
  userServices.verifyJWT,
  userServices.verifyIdExists,
  userController.update
);
routerUser.post(
  "/recoverPassword",
  userServices.recoverPassword
);
routerUser.post(
  "/updatePassword",
  userServices.verifyUpdatePassword
);
routerUser.post(
  "/validate",
  HandleRules.bodyRulesLogin,
  HandleValidation.verifyValitadion,
  userServices.handleLogin
);
routerUser.delete(
  "/:id",
  userServices.verifyJWT,
  userServices.verifyIdExists,
  userController.delete
);

export default routerUser;
