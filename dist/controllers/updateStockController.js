"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UpdateStockModel_1 = require("../database/model/UpdateStockModel");
const IncrementOrderModel_1 = require("../database/model/IncrementOrderModel");
const ProductsModel_1 = require("../database/model/ProductsModel");
const sequelize_1 = require("sequelize");
class updateStockController {
    async create(req, res) {
        const order = req.body;
        const { user_ID } = req.params;
        try {
            for (let i = 0; i < order.length; i++) {
                await UpdateStockModel_1.UpdateStockModel.create({
                    id: (0, uuid_1.v4)(),
                    product: order[i].product,
                    product_id: order[i].product_id,
                    quantity: order[i].quantity,
                    user_ID
                });
                await ProductsModel_1.ProductsModel.increment({ quantity: +order[i].quantity }, {
                    where: {
                        id: order[i].product_id,
                    },
                });
            }
            await IncrementOrderModel_1.IncrementOrderModel.destroy({
                where: {
                    user_id: user_ID,
                },
            });
            return res.status(201).json({ message: "Atualização realizada com sucesso" });
        }
        catch (e) {
            return res
                .status(400)
                .json({ message: "Algo deu errado, tente novamente" });
        }
    }
    async findById(req, res) {
        const { id } = req.params;
        const sale = await UpdateStockModel_1.UpdateStockModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(sale);
    }
    async findTotalAmountOfSale(req, res) {
        const { user_ID } = req.params;
        const sumTotal = await UpdateStockModel_1.UpdateStockModel.sum("totalProduct", {
            where: {
                user_ID: user_ID,
                paid: "N",
            },
        });
        if (!sumTotal) {
            return res
                .status(400)
                .json({ message: "Não existe nada cadastrados" });
        }
        else {
            return res.status(200).json(sumTotal);
        }
    }
    async findSalesClient(req, res) {
        const { client_ID } = req.params;
        const salesClient = await UpdateStockModel_1.UpdateStockModel.findAll({
            where: {
                client_ID: client_ID,
            },
        });
        return res.status(200).json(salesClient);
    }
    async delete(req, res) {
        const { id } = req.params;
        const sale = await UpdateStockModel_1.UpdateStockModel.destroy({
            where: {
                id: id,
            },
        });
        if (!sale) {
            return res.status(404).json({ message: "Venda não existe" });
        }
        else {
            return res.status(200).json({ message: "Venda excluida com sucesso" });
        }
    }
    async findOutByDate(req, res) {
        const { id, initialDate, finalDate } = req.query;
        const allProductsInTheCategory = await UpdateStockModel_1.UpdateStockModel.findAll({
            where: {
                user_ID: id,
                createdAt: {
                    [sequelize_1.Op.lte]: `${finalDate} 21:00:00`,
                    [sequelize_1.Op.gte]: `${initialDate} 00:00:00`,
                },
            },
        });
        if (!allProductsInTheCategory) {
            return res
                .status(400)
                .json({ message: "Não existem Atualizações neste intervalo" });
        }
        else {
            return res.status(200).json(allProductsInTheCategory);
        }
    }
}
exports.default = new updateStockController();
