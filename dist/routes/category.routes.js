"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const userServices_1 = __importDefault(require("../controllers/services/userServices"));
const routerCategory = (0, express_1.Router)();
routerCategory.post("/:user_ID", userServices_1.default.verifyJWT, categoryController_1.default.create);
routerCategory.get("/:user_ID", userServices_1.default.verifyJWT, categoryController_1.default.findCategorys);
routerCategory.get("/category/:id", userServices_1.default.verifyJWT, categoryController_1.default.findById);
routerCategory.delete("/:id", userServices_1.default.verifyJWT, categoryController_1.default.delete);
routerCategory.put("/:id", userServices_1.default.verifyJWT, categoryController_1.default.update);
exports.default = routerCategory;
