"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outOfStockController_1 = __importDefault(require("../controllers/outOfStockController"));
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const routerOutOfStock = (0, express_1.Router)();
routerOutOfStock.get("/:user_ID", userServices_1.default.verifyJWT, outOfStockController_1.default.findOutByDate);
routerOutOfStock.get("/findByDate/", userServices_1.default.verifyJWT, outOfStockController_1.default.findOutByDate);
routerOutOfStock.post("/:user_ID", outOfStockController_1.default.create);
routerOutOfStock.delete("/:id", userServices_1.default.verifyJWT, outOfStockController_1.default.delete);
exports.default = routerOutOfStock;
