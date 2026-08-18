import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { ProductsModel } from "../database/model/ProductsModel";

class productController {
  async create(req: Request, res: Response) {
    const { name, fornecedor, category, quantity, estoque } = req.body;
    const { user_ID } = req.params;

    await ProductsModel.create({
      id: uuidV4(),
      name,
      fornecedor,
      estoque,
      categoryProduct: category.name,
      quantity,
      user_ID,
      category_ID: category.id,
    });

    return res.status(201).json({ message: "Produto cadastrado com sucesso" });
  }

  async findProducts(req: Request, res: Response) {
    const { user_ID } = req.params;

    const allProducts = await ProductsModel.findAll({
      where: {
        user_ID: user_ID,
      },
      order: [["name", "ASC"]],
    });

    if (!allProducts) {
      return res
        .status(400)
        .json({ message: "Não existem produtos cadastrados" });
    } else {
      return res.status(200).json(allProducts);
    }
  }

  async findProductsStockZero(req: Request, res: Response) {
    const { user_ID, quantity } = req.params;

    const allProducts = await ProductsModel.findAll({
      where: {
        user_ID: user_ID,
        quantity: quantity,
      },
      order: [["name", "ASC"]],
    });

    if (!allProducts) {
      return res
        .status(400)
        .json({ message: "Não existem produtos cadastrados" });
    } else {
      return res.status(200).json(allProducts);
    }
  }

  async findProductsByCategory(req: Request, res: Response) {
    const { user_ID } = req.params;
    const { category } = req.query;

    const allProductsInTheCategory = await ProductsModel.findAll({
      where: {
        categoryProduct: category,
        user_ID: user_ID,
      },
      order: [["name", "ASC"]],
    });

    if (!allProductsInTheCategory) {
      return res
        .status(400)
        .json({ message: "Não existem produtos desta catetoria" });
    } else {
      return res.status(200).json(allProductsInTheCategory);
    }
  }

  async findProductsByEstoque(req: Request, res: Response) {
    const { estoque } = req.params;
    

    const allProductsInTheCategory = await ProductsModel.findAll({
      where: {
        estoque: estoque,
      },
      order: [["name", "ASC"]],
    });

    console.log(allProductsInTheCategory);
    
    if (!allProductsInTheCategory) {
      return res
        .status(400)
        .json({ message: "Não existem produtos neste estoque" });
    } else {
      return res.status(200).json(allProductsInTheCategory);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const client: any = await ProductsModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(client);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductsModel.destroy({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não cadastrado" });
    } else {
      return res.status(200).json({ message: "Produto deletado com sucesso" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await ProductsModel.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Produto Atualizado com sucesso" });
  }
}

export default new productController();
