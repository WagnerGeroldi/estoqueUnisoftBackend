import { Router } from "express";


import routerUser from "./user.routes";
import routerProduct from "./products.routes";
import routerOrder from "./order.routes";
import routerCategory from "./category.routes";
import routerOutOfStock from "./outOfStock.routes";
import routerOrderIncrement from "./orderIncrement.routes";
import routerUpdateStock from "./updateStock.routes";
import routerEstoque from "./estoque.routes";
import routerDadosAtuais from "./certificado.routes";

const router = Router();

router.use("/users", routerUser);
router.use("/products", routerProduct);
router.use("/order", routerOrder);
router.use("/estoque", routerEstoque);
router.use("/category", routerCategory);
router.use("/outOfStock", routerOutOfStock);
router.use("/orderIncrement", routerOrderIncrement);
router.use("/updateStock", routerUpdateStock);
router.use("/certificados", routerDadosAtuais);

export default router;
