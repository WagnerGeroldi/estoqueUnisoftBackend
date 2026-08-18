import { Router } from "express";
import categoryController from "../controllers/categoryController";
import userServices from "../controllers/services/userServices";

const routerCategory = Router();

routerCategory.post(
  "/:user_ID",
  userServices.verifyJWT,
  categoryController.create
);

routerCategory.get(
  "/:user_ID",
  userServices.verifyJWT,
  categoryController.findCategorys
);

routerCategory.get(
  "/category/:id",
  userServices.verifyJWT,
  categoryController.findById
);

routerCategory.delete(
  "/:id",
  userServices.verifyJWT,
  categoryController.delete
);

routerCategory.put("/:id", userServices.verifyJWT, categoryController.update);

export default routerCategory;
