"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const updateStockController_1 = __importDefault(require("../controllers/updateStockController"));
const routerUpdateStock = (0, express_1.Router)();
routerUpdateStock.post("/:user_ID", updateStockController_1.default.create);
routerUpdateStock.get("/sale/:id", userServices_1.default.verifyJWT, updateStockController_1.default.findById);
routerUpdateStock.delete("/:id", userServices_1.default.verifyJWT, updateStockController_1.default.delete);
routerUpdateStock.get("/findByDate/", userServices_1.default.verifyJWT, updateStockController_1.default.findOutByDate);
exports.default = routerUpdateStock;
