"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsModel_1 = require("../../database/model/ProductsModel");
require("dotenv/config");
class productServices {
    async verifyProductExists(req, res, next) {
        const { name, estoque } = req.body;
        await ProductsModel_1.ProductsModel.count({
            where: {
                name: name,
                estoque: estoque
            },
        }).then((count) => {
            if (count != 0) {
                return res.status(400).json({ message: "Produto já cadastrado" });
            }
            else {
                next();
            }
        });
    }
    async countProduct(req, res) {
        const { user_ID } = req.params;
        const productCount = await ProductsModel_1.ProductsModel.count({
            where: {
                user_ID: user_ID
            },
        });
        return res.status(200).json(productCount);
    }
    async countProductStockZero(req, res) {
        const productCount = await ProductsModel_1.ProductsModel.count({
            where: {
                quantity: 0
            },
        });
        return res.status(200).json(productCount);
    }
}
exports.default = new productServices();
