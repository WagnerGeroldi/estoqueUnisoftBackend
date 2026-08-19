"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const decreaseOrderController_1 = __importDefault(require("../controllers/decreaseOrderController"));
const decreaseOrderService_1 = __importDefault(require("../controllers/services/decreaseOrderService"));
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const routerOrder = (0, express_1.Router)();
routerOrder.get("/:user_ID", userServices_1.default.verifyJWT, decreaseOrderController_1.default.findOrder);
routerOrder.post("/:user_ID", userServices_1.default.verifyJWT, decreaseOrderService_1.default.verifyProductExists, decreaseOrderService_1.default.verifyInventory, decreaseOrderController_1.default.create);
routerOrder.delete("/:id", userServices_1.default.verifyJWT, decreaseOrderController_1.default.delete);
routerOrder.delete("/clearList/:user_ID", userServices_1.default.verifyJWT, decreaseOrderController_1.default.deleteOrder);
exports.default = routerOrder;
