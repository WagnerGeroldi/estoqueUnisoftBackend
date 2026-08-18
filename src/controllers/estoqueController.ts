import { NextFunction, Request, Response } from "express";
import { EstoqueModel } from "../database/model/EstoqueModel";


class estoqueController {

  async create(req: Request, res: Response) {
    const { estoque } = req.body;

    await EstoqueModel.create({
      estoque,
    });

    return res
      .status(201)
      .json({ message: "Estoque cadastrada com sucesso" });
  }

  async findEstoque(req: Request, res: Response) {

    const allCategorys = await EstoqueModel.findAll()

    if (!allCategorys) {
      return res
        .status(400)
        .json({ message: "Não existem Estoque cadastrada" });
    } else {
      return res.status(200).json(allCategorys);
    }
  }


  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const category: any = await EstoqueModel.findOne({
      where: {
        category_ID: id,
      },
    });

    if (!category) {
      await EstoqueModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Estoque deletada com sucesso" });
    } else {
      return res
        .status(400)
        .json({ message: "EstoqueModel está em uso e não pode ser deletada" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await EstoqueModel.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Categoria Atualizada com sucesso" });
  }

  async verifyCategoryExists(req: Request, res: Response, next: NextFunction) {
    const { estoque } = req.body;
 
    await EstoqueModel.count({
      where: {
        name: estoque,
      },
    }).then((count) => {
      if (count != 0) {
        return res.status(400).json({ message: "Estoque já cadastrada" });
      } else {
        next();
      }
    });
  }
}

export default new estoqueController();
