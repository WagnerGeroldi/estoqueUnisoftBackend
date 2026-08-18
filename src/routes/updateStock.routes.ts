import { Router } from "express";
import userServices from "../controllers/services/userServices";
import updateStockController from "../controllers/updateStockController";

const routerUpdateStock = Router();

routerUpdateStock.post("/:user_ID", updateStockController.create);
routerUpdateStock.get(
  "/sale/:id",
  userServices.verifyJWT,
  updateStockController.findById
);
routerUpdateStock.delete(
  "/:id",
  userServices.verifyJWT,
  updateStockController.delete
);
routerUpdateStock.get(
  "/findByDate/",
  userServices.verifyJWT,
  updateStockController.findOutByDate
);

export default routerUpdateStock;
