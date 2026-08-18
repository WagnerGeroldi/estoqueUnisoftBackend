import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { CategoryModel } from "../database/model/CategoryModel";
import { ProductsModel } from "../database/model/ProductsModel";

class categoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const { user_ID } = req.params;

    await CategoryModel.create({
      id: uuidV4(),
      name,
      user_ID,
    });

    return res
      .status(201)
      .json({ message: "Categoria cadastrada com sucesso" });
  }

  async findCategorys(req: Request, res: Response) {
    const { user_ID } = req.params;

    const allCategorys = await CategoryModel.findAll({
      where: {
        user_ID: user_ID,
      },
      order: [["name", "ASC"]],
    });

    if (!allCategorys) {
      return res
        .status(400)
        .json({ message: "Não existem Categoria cadastrada" });
    } else {
      return res.status(200).json(allCategorys);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const category: any = await CategoryModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const category: any = await ProductsModel.findOne({
      where: {
        category_ID: id,
      },
    });

    if (!category) {
      await CategoryModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Categoria deletada com sucesso" });
    } else {
      return res
        .status(400)
        .json({ message: "Categoria está em uso e não pode ser deletada" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await CategoryModel.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Categoria Atualizada com sucesso" });
  }

  async verifyCategoryExists(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
 
    await CategoryModel.count({
      where: {
        name: name,
      },
    }).then((count) => {
      if (count != 0) {
        return res.status(400).json({ message: "Categoria já cadastrada" });
      } else {
        next();
      }
    });
  }
}

export default new categoryController();
