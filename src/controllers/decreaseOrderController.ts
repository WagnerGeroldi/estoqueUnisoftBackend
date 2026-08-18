import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { DecreaseOrderModel } from "../database/model/DecreaseOrderModel";

class decreaseOrderController {

  async create(req: Request, res: Response) {
  
    const { product, quantity } = req.body;
    const { user_ID } = req.params;
      

    await DecreaseOrderModel.create({
      id: uuidV4(),
      product: product.name,
      product_id: product.id, 
      quantity,
      category: product.categoryProduct,
      user_ID
    });

    const allOrder = await DecreaseOrderModel.findAll({
      where: {
        user_ID: user_ID,
      },
    });

    return res.status(201).json({ message: "PRODUTO ADICIONADO", allOrder });
  }

  async findOrder(req: Request, res: Response) {
    const { user_ID } = req.params;

    const allOrder = await DecreaseOrderModel.findAll({
      where: {
        user_ID: user_ID,
      },
    });

    if (!allOrder) {
      return res
        .status(400)
        .json({ message: "Erro, tente novamente" });
    } else {
      
      return res.status(200).json(allOrder);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const order: any = await DecreaseOrderModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const item = await DecreaseOrderModel.destroy({
      where: {
        id: id,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Produto não cadastrado" });
    } else {
      return res.status(200).json({ message: "Produto deletado com sucesso" });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { user_ID } = req.params;

    const item = await DecreaseOrderModel.destroy({
      where: {
        user_ID: user_ID,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "A lista já está vazia" });
    } else {
      return res
        .status(200)
        .json({ message: "Produtos deletados com sucesso" });
    }
  }
}

export default new decreaseOrderController();
