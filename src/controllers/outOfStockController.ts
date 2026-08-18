import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { OutOfStockModel } from "../database/model/OutOfStockModel";
import { DecreaseOrderModel } from "../database/model/DecreaseOrderModel";
import { ProductsModel } from "../database/model/ProductsModel";
import { Op } from "sequelize";

class outOfStockController {
  async create(req: Request, res: Response) {
    const order = req.body;
    const { user_ID } = req.params;

    try {
      for (let i = 0; i < order.length; i++) {
        await OutOfStockModel.create({
          id: uuidV4(),
          product: order[i].product,
          quantity: order[i].quantity,
          user_ID,
        });

        await ProductsModel.increment(
          { quantity: -order[i].quantity },
          {
            where: {
              id: order[i].product_id,
            },
          }
        );
      }

      await DecreaseOrderModel.destroy({
        where: {
          user_id: user_ID,
        },
      });

      return res.status(201).json({ message: "Baixa realizada com sucesso" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Algo deu errado, tente novamente" });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const sale: any = await OutOfStockModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(sale);
  }

  async findOutByDate(req: Request, res: Response) {
    const { id, initialDate, finalDate } = req.query;
    

    const allProductsInTheCategory = await OutOfStockModel.findAll({
      where: {
        user_ID: id,
        createdAt: {
          [Op.lte]: `${finalDate} 21:00:00`,
          [Op.gte]: `${initialDate} 00:00:00`,
        },
      },
    });

    
    if (!allProductsInTheCategory) {
      return res
        .status(400)
        .json({ message: "Não existem Baixas neste intervalo" });
    } else {
      return res.status(200).json(allProductsInTheCategory);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const sale = await OutOfStockModel.destroy({
      where: {
        id: id,
      },
    });

    if (!sale) {
      return res.status(404).json({ message: "Venda não existe" });
    } else {
      return res.status(200).json({ message: "Venda excluida com sucesso" });
    }
  }
}

export default new outOfStockController();
