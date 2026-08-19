"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const IncrementOrderModel_1 = require("../database/model/IncrementOrderModel");
class incrementOrderController {
    async create(req, res) {
        const { product, quantity } = req.body;
        const { user_ID } = req.params;
        await IncrementOrderModel_1.IncrementOrderModel.create({
            id: (0, uuid_1.v4)(),
            product: product.name,
            product_id: product.id,
            quantity,
            category: product.categoryProduct,
            user_ID
        });
        const allOrder = await IncrementOrderModel_1.IncrementOrderModel.findAll({
            where: {
                user_ID: user_ID,
            },
        });
        return res.status(201).json({ message: " PRODUTO ADICIONADO", allOrder });
    }
    async findOrder(req, res) {
        const { user_ID } = req.params;
        const allOrder = await IncrementOrderModel_1.IncrementOrderModel.findAll({
            where: {
                user_ID: user_ID,
            },
        });
        if (!allOrder) {
            return res
                .status(400)
                .json({ message: "ERRO, TENTE NOVAMENTE" });
        }
        else {
            return res.status(200).json(allOrder);
        }
    }
    async findById(req, res) {
        const { id } = req.params;
        const order = await IncrementOrderModel_1.IncrementOrderModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(order);
    }
    async delete(req, res) {
        const { id } = req.params;
        const item = await IncrementOrderModel_1.IncrementOrderModel.destroy({
            where: {
                id: id,
            },
        });
        if (!item) {
            return res.status(404).json({ message: "Produto não cadastrado" });
        }
        else {
            return res.status(200).json({ message: "Produto deletado com sucesso" });
        }
    }
    async deleteOrder(req, res) {
        const { user_ID } = req.params;
        const item = await IncrementOrderModel_1.IncrementOrderModel.destroy({
            where: {
                user_ID: user_ID,
            },
        });
        if (!item) {
            return res.status(404).json({ message: "A lista já está vazia" });
        }
        else {
            return res
                .status(200)
                .json({ message: "Produtos deletados com sucesso" });
        }
    }
}
exports.default = new incrementOrderController();
