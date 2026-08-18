import { Router } from "express";
import estoqueController from "../controllers/estoqueController";
import userServices from "../controllers/services/userServices";

const routerEstoque = Router();

routerEstoque.post(
  "/:user_ID",
  userServices.verifyJWT,
  estoqueController.create
);

routerEstoque.get("/all", estoqueController.findEstoque);

routerEstoque.delete("/:id", userServices.verifyJWT, estoqueController.delete);

routerEstoque.put("/:id", userServices.verifyJWT, estoqueController.update);

export default routerEstoque;
