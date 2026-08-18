import { NextFunction, Request, Response } from "express";
import { DecreaseOrderModel } from "../../database/model/DecreaseOrderModel";
import "dotenv/config";

import { ProductsModel } from "../../database/model/ProductsModel";

class decreaseOrderService {
  async verifyProductExists(req: Request, res: Response, next: NextFunction) {
    const { product } = req.body;
    const { user_ID } = req.params;

    await DecreaseOrderModel.count({
      where: {
        product: product.name,
        user_ID: user_ID,
      },
    }).then((count) => {
      if (count != 0) {
        return res
          .status(400)
          .json({ message: "Produto já cadastrado na lista" });
      } else {
        next();
      }
    });
  }

  async verifyInventory(req: Request, res: Response, next: NextFunction) {
    const { product, quantity } = req.body;

    const resultSearch = await ProductsModel.findOne({
      where: {
        id: product.id,
        user_ID: product.user_ID,
      },
    });

    if (resultSearch.getDataValue("quantity") >= quantity) {
      next();
    } else {
      return res.status(400).json({ message: "Quantidade indisponível" });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { client_ID } = req.params;

    const item = await DecreaseOrderModel.destroy({
      where: {
        client_id: client_ID,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Erro ao limpar a lista" });
    } else {
      return res.status(200).json({ message: "Lista limpa com sucesso" });
    }
  }
}

export default new decreaseOrderService();
