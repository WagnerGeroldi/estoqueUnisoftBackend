import { NextFunction, Request, Response } from "express";
import { ProductsModel } from "../../database/model/ProductsModel";
import "dotenv/config";


class productServices {
  async verifyProductExists(req: Request, res: Response, next: NextFunction) {
    const { name, estoque } = req.body;
 
    await ProductsModel.count({
      where: {
        name: name,
        estoque: estoque
      },
    }).then((count) => {
      if (count != 0) {
        return res.status(400).json({ message: "Produto já cadastrado" });
      } else {
        next();
      }
    });
  }

  async countProduct(req: Request, res: Response) {
    const { user_ID } = req.params;
    const productCount = await ProductsModel.count({
      where: {
        user_ID: user_ID
      },
    });
    return res.status(200).json(productCount);
  }

  async countProductStockZero(req: Request, res: Response) {
    const productCount = await ProductsModel.count({
      where: {
        quantity: 0
      },
    });
    return res.status(200).json(productCount);
  }
}

export default new productServices();
