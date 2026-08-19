"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incrementOrderController_1 = __importDefault(require("../controllers/incrementOrderController"));
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const routerIncrementOrder = (0, express_1.Router)();
routerIncrementOrder.get("/:user_ID", userServices_1.default.verifyJWT, incrementOrderController_1.default.findOrder);
routerIncrementOrder.post("/:user_ID", userServices_1.default.verifyJWT, incrementOrderController_1.default.create);
routerIncrementOrder.delete("/:id", userServices_1.default.verifyJWT, incrementOrderController_1.default.delete);
routerIncrementOrder.delete("/clearList/:user_ID", userServices_1.default.verifyJWT, incrementOrderController_1.default.deleteOrder);
exports.default = routerIncrementOrder;
