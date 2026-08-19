"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estoqueController_1 = __importDefault(require("../controllers/estoqueController"));
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const routerEstoque = (0, express_1.Router)();
routerEstoque.post("/:user_ID", userServices_1.default.verifyJWT, estoqueController_1.default.create);
routerEstoque.get("/all", estoqueController_1.default.findEstoque);
routerEstoque.delete("/:id", userServices_1.default.verifyJWT, estoqueController_1.default.delete);
routerEstoque.put("/:id", userServices_1.default.verifyJWT, estoqueController_1.default.update);
exports.default = routerEstoque;
