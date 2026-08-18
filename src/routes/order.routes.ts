import { Router } from "express";
import orderController from "../controllers/decreaseOrderController";
import orderService from "../controllers/services/decreaseOrderService";
import userServices from "../controllers/services/userServices";


const routerOrder = Router();

routerOrder.get("/:user_ID",   userServices.verifyJWT, orderController.findOrder);
routerOrder.post("/:user_ID",   userServices.verifyJWT, orderService.verifyProductExists, orderService.verifyInventory,  orderController.create);
routerOrder.delete("/:id",   userServices.verifyJWT, orderController.delete);
routerOrder.delete("/clearList/:user_ID",   userServices.verifyJWT, orderController.deleteOrder);

export default routerOrder;
