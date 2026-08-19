"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OutOfStockModel_1 = require("../../database/model/OutOfStockModel");
const ProductsModel_1 = require("../../database/model/ProductsModel");
require("dotenv/config");
class outOfStockService {
    async verifyProductExists(req, res, next) {
        const { product } = req.body;
        const { user_ID } = req.params;
        await OutOfStockModel_1.OutOfStockModel.count({
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
    async deleteOrder(req, res, next) {
        const { user_ID } = req.params;
        const item = await OutOfStockModel_1.OutOfStockModel.destroy({
            where: {
                user_id: user_ID,
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
exports.default = new outOfStockService();
