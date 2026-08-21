import { Request, Response } from "express";
import { CertificadoModel } from "../database/model/CertificadoModel";
import { db } from "../database";
import { Op, QueryTypes } from "sequelize";
import { Readable } from "stream";
import readline from "readline";

class CertificadoController {

  async create(req: Request, res: Response) {
    const { nome, curso, cidade, periodo } = req.body;
 


    await CertificadoModel.create({
      nome,
      curso,
      cidade,
      periodo,
      entrega: "N",
      data_entrega: null,
    });

    return res.status(201).json({ message: "Certificado cadastrado com sucesso" });
  }




  async findAllData(req: Request, res: Response) {
    const listaCompleta = await CertificadoModel.findAll({
      order: [["nome", "ASC"]],
      where: {
        entrega: "N",
      },
    });
    return res.status(200).json(listaCompleta);
  }

  async countTotal(req: Request, res: Response) {
    const items = await CertificadoModel.count({
      where: {
        id: {
          [Op.gt]: 0,
        },
        entrega: "N",
      },
    });

    return res.status(200).json(items);
  }

  async findAllDataEntregue(req: Request, res: Response) {
    const listaCompleta = await CertificadoModel.findAll({
      order: [["nome", "ASC"]],
      where: {
        entrega: "S",
      },
    });
    return res.status(200).json(listaCompleta);
  }

  async updateData(req: Request, res: Response) {
    const { id } = req.params;

    const entrega = "S";
    const data_entrega = new Date();

    await CertificadoModel.update(
      { entrega: entrega, data_entrega: data_entrega },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ message: "Produto Atualizado com sucesso" });
  }

  async countTotalEntregue(req: Request, res: Response) {
    const items = await CertificadoModel.count({
      where: {
        id: {
          [Op.gt]: 0,
        },
        entrega: "S",
      },
    });

    return res.status(200).json(items);
  }

  async insertData(req: Request, res: Response) {
    const { file } = req;
    const { buffer } = file;

    const readbableFile = new Readable();

    readbableFile.push(buffer);
    readbableFile.push(null);

    const certificadoLine = readline.createInterface({
      input: readbableFile,
    });

    const certificados = [] as any;

    for await (let line of certificadoLine) {
      const lineCertificado = line.split(";");

      certificados.push({
        nome: lineCertificado[0].trim(),
        curso: lineCertificado[1].trim(),
        periodo: lineCertificado[2].trim(),
        cidade: lineCertificado[3].trim(),
        entrega: lineCertificado[4].trim(),
      });
    }

    for await (let { nome, curso, periodo, cidade, entrega } of certificados) {
      await CertificadoModel.create({
        nome,
        curso,
        periodo,
        cidade,
        entrega,
      });
    }

    res.status(201).json({ message: "Inserido com sucesso!" });
  }
}

export default new CertificadoController();
