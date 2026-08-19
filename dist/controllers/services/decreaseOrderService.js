"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DecreaseOrderModel_1 = require("../../database/model/DecreaseOrderModel");
require("dotenv/config");
const ProductsModel_1 = require("../../database/model/ProductsModel");
class decreaseOrderService {
    async verifyProductExists(req, res, next) {
        const { product } = req.body;
        const { user_ID } = req.params;
        await DecreaseOrderModel_1.DecreaseOrderModel.count({
            where: {
                product: product.name,
                user_ID: user_ID,
            },
        }).then((count) => {
            if (count != 0) {
                return res
                    .status(400)
                    .json({ message: "Produto já cadastrado na lista" });
            }
            else {
                next();
            }
        });
    }
    async verifyInventory(req, res, next) {
        const { product, quantity } = req.body;
        const resultSearch = await ProductsModel_1.ProductsModel.findOne({
            where: {
                id: product.id,
                user_ID: product.user_ID,
            },
        });
        if (resultSearch.getDataValue("quantity") >= quantity) {
            next();
        }
        else {
            return res.status(400).json({ message: "Quantidade indisponível" });
        }
    }
    async deleteOrder(req, res) {
        const { client_ID } = req.params;
        const item = await DecreaseOrderModel_1.DecreaseOrderModel.destroy({
            where: {
                client_id: client_ID,
            },
        });
        if (!item) {
            return res.status(404).json({ message: "Erro ao limpar a lista" });
        }
        else {
            return res.status(200).json({ message: "Lista limpa com sucesso" });
        }
    }
}
exports.default = new decreaseOrderService();
