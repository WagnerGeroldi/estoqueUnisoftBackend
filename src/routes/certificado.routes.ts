import { Router } from "express";
import CertificadoController from "../controllers/CertificadoController";
import multer from "multer";

const multerConfig = multer();
const routerDadosAtuais = Router();

routerDadosAtuais.get("/count", CertificadoController.countTotal);
routerDadosAtuais.get("/countEntregue", CertificadoController.countTotalEntregue);
routerDadosAtuais.get("/findAll", CertificadoController.findAllData);
routerDadosAtuais.get("/update/:id", CertificadoController.updateData);
routerDadosAtuais.get("/findAllEntregue", CertificadoController.findAllDataEntregue);
routerDadosAtuais.post("/cadastrar", CertificadoController.create);

routerDadosAtuais.post(
  "/insertData",
  multerConfig.single("certificados"),
  CertificadoController.insertData
);

export default routerDadosAtuais;
