"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const OutOfStockModel_1 = require("../database/model/OutOfStockModel");
const DecreaseOrderModel_1 = require("../database/model/DecreaseOrderModel");
const ProductsModel_1 = require("../database/model/ProductsModel");
const sequelize_1 = require("sequelize");
class outOfStockController {
    async create(req, res) {
        const order = req.body;
        const { user_ID } = req.params;
        try {
            for (let i = 0; i < order.length; i++) {
                await OutOfStockModel_1.OutOfStockModel.create({
                    id: (0, uuid_1.v4)(),
                    product: order[i].product,
                    quantity: order[i].quantity,
                    user_ID,
                });
                await ProductsModel_1.ProductsModel.increment({ quantity: -order[i].quantity }, {
                    where: {
                        id: order[i].product_id,
                    },
                });
            }
            await DecreaseOrderModel_1.DecreaseOrderModel.destroy({
                where: {
                    user_id: user_ID,
                },
            });
            return res.status(201).json({ message: "Baixa realizada com sucesso" });
        }
        catch (e) {
            return res
                .status(400)
                .json({ message: "Algo deu errado, tente novamente" });
        }
    }
    async findById(req, res) {
        const { id } = req.params;
        const sale = await OutOfStockModel_1.OutOfStockModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(sale);
    }
    async findOutByDate(req, res) {
        const { id, initialDate, finalDate } = req.query;
        const allProductsInTheCategory = await OutOfStockModel_1.OutOfStockModel.findAll({
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
                .json({ message: "Não existem Baixas neste intervalo" });
        }
        else {
            return res.status(200).json(allProductsInTheCategory);
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        const sale = await OutOfStockModel_1.OutOfStockModel.destroy({
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
}
exports.default = new outOfStockController();
