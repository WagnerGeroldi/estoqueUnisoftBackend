import { Router } from "express";
import outOfStockController from "../controllers/outOfStockController";
import userServices from "../controllers/services/userServices";

const routerOutOfStock = Router();

routerOutOfStock.get(
  "/:user_ID",
  userServices.verifyJWT,
  outOfStockController.findOutByDate
);

routerOutOfStock.get(
  "/findByDate/",
  userServices.verifyJWT,
  outOfStockController.findOutByDate
);

routerOutOfStock.post("/:user_ID", outOfStockController.create);

routerOutOfStock.delete(
  "/:id",
  userServices.verifyJWT,
  outOfStockController.delete
);

export default routerOutOfStock;
