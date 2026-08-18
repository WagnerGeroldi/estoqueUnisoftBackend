import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { UpdateStockModel } from "../database/model/UpdateStockModel";
import { IncrementOrderModel } from "../database/model/IncrementOrderModel";
import { ProductsModel } from "../database/model/ProductsModel";
import { Op } from "sequelize";

class updateStockController {
  async create(req: Request, res: Response) {

    const order = req.body;
    const { user_ID } = req.params;


    try {
      for (let i = 0; i < order.length; i++) {

        await UpdateStockModel.create({
          id: uuidV4(),
          product: order[i].product,
          product_id: order[i].product_id,
          quantity: order[i].quantity,
          user_ID
        });

          await ProductsModel.increment(
          { quantity: +order[i].quantity },
          {
            where: {
              id: order[i].product_id,
            },
          }
        );
      }

      await IncrementOrderModel.destroy({
        where: {
          user_id: user_ID,
        },
      });

      return res.status(201).json({ message: "Atualização realizada com sucesso" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Algo deu errado, tente novamente" });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const sale: any = await UpdateStockModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(sale);
  }

  async findTotalAmountOfSale(req: Request, res: Response) {
    const { user_ID } = req.params;

    const sumTotal = await UpdateStockModel.sum("totalProduct", {
      where: {
        user_ID: user_ID,
        paid: "N",
      },
    });

    if (!sumTotal) {
      return res
        .status(400)
        .json({ message: "Não existe nada cadastrados" });
    } else {
      return res.status(200).json(sumTotal);
    }
  }

  async findSalesClient(req: Request, res: Response) {
    const { client_ID } = req.params;

    const salesClient = await UpdateStockModel.findAll({
      where: {
        client_ID: client_ID,
      },
    });

    return res.status(200).json(salesClient);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const sale = await UpdateStockModel.destroy({
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

  async findOutByDate(req: Request, res: Response) {
    const { id, initialDate, finalDate } = req.query;


    const allProductsInTheCategory = await UpdateStockModel.findAll({
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
        .json({ message: "Não existem Atualizações neste intervalo" });
    } else {
      return res.status(200).json(allProductsInTheCategory);
    }
  }


}

export default new updateStockController();
