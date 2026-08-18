import { Router } from "express";
import incrementOrderController from "../controllers/incrementOrderController";
import userServices from "../controllers/services/userServices";


const routerIncrementOrder = Router();

routerIncrementOrder.get("/:user_ID",   userServices.verifyJWT, incrementOrderController.findOrder);
routerIncrementOrder.post("/:user_ID",   userServices.verifyJWT,  incrementOrderController.create);
routerIncrementOrder.delete("/:id",   userServices.verifyJWT, incrementOrderController.delete);
routerIncrementOrder.delete("/clearList/:user_ID",   userServices.verifyJWT, incrementOrderController.deleteOrder);

export default routerIncrementOrder;
