import { Router } from "express";
import productController from "../controllers/productController";
import productServices from "../controllers/services/productService";
import userServices from "../controllers/services/userServices";

const routerProduct = Router();

routerProduct.get("/:user_ID",   userServices.verifyJWT, productController.findProducts);
routerProduct.get("/FindStockZero/:user_ID/:quantity",  productController.findProductsStockZero);
routerProduct.get("/findByCategory/:user_ID/",   userServices.verifyJWT, productController.findProductsByCategory);
routerProduct.get("/findByFornecedores/:user_ID/",   userServices.verifyJWT, productController.findProductsByFornecedor);
routerProduct.get("/findByEstoque/:estoque/",   userServices.verifyJWT, productController.findProductsByEstoque);
routerProduct.get("/countProducts/:user_ID",   userServices.verifyJWT, productServices.countProduct);
routerProduct.get("/countProductsStockZero/", productServices.countProductStockZero);
routerProduct.get("/fornecedores/:user_ID",  productController.findFornecedores);
routerProduct.get("/details/:id",   userServices.verifyJWT, productController.findById );
routerProduct.post("/:user_ID",   userServices.verifyJWT, productServices.verifyProductExists, productController.create);
routerProduct.put("/:id",   userServices.verifyJWT, productController.update);
routerProduct.delete("/:id",  productController.delete);

export default routerProduct;
