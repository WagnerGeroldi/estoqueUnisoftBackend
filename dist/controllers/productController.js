"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const ProductsModel_1 = require("../database/model/ProductsModel");
class productController {
    async create(req, res) {
        const { name, fornecedor, category, quantity, estoque } = req.body;
        const { user_ID } = req.params;
        await ProductsModel_1.ProductsModel.create({
            id: (0, uuid_1.v4)(),
            name,
            fornecedor,
            estoque,
            categoryProduct: category.name,
            quantity,
            user_ID,
            category_ID: category.id,
        });
        return res.status(201).json({ message: "Produto cadastrado com sucesso" });
    }
    async findProducts(req, res) {
        const { user_ID } = req.params;
        const allProducts = await ProductsModel_1.ProductsModel.findAll({
            where: {
                user_ID: user_ID,
            },
            order: [["name", "ASC"]],
        });
        if (!allProducts) {
            return res
                .status(400)
                .json({ message: "Não existem produtos cadastrados" });
        }
        else {
            return res.status(200).json(allProducts);
        }
    }
    async findProductsStockZero(req, res) {
        const { user_ID, quantity } = req.params;
        const allProducts = await ProductsModel_1.ProductsModel.findAll({
            where: {
                user_ID: user_ID,
                quantity: quantity,
            },
            order: [["name", "ASC"]],
        });
        if (!allProducts) {
            return res
                .status(400)
                .json({ message: "Não existem produtos cadastrados" });
        }
        else {
            return res.status(200).json(allProducts);
        }
    }
    async findProductsByCategory(req, res) {
        const { user_ID } = req.params;
        const { category } = req.query;
        const allProductsInTheCategory = await ProductsModel_1.ProductsModel.findAll({
            where: {
                categoryProduct: category,
                user_ID: user_ID,
            },
            order: [["name", "ASC"]],
        });
        if (!allProductsInTheCategory) {
            return res
                .status(400)
                .json({ message: "Não existem produtos desta catetoria" });
        }
        else {
            return res.status(200).json(allProductsInTheCategory);
        }
    }
    async findProductsByEstoque(req, res) {
        const { estoque } = req.params;
        const allProductsInTheCategory = await ProductsModel_1.ProductsModel.findAll({
            where: {
                estoque: estoque,
            },
            order: [["name", "ASC"]],
        });
        console.log(allProductsInTheCategory);
        if (!allProductsInTheCategory) {
            return res
                .status(400)
                .json({ message: "Não existem produtos neste estoque" });
        }
        else {
            return res.status(200).json(allProductsInTheCategory);
        }
    }
    async findById(req, res) {
        const { id } = req.params;
        const client = await ProductsModel_1.ProductsModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(client);
    }
    async delete(req, res) {
        const { id } = req.params;
        const product = await ProductsModel_1.ProductsModel.destroy({
            where: {
                id: id,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Produto não cadastrado" });
        }
        else {
            return res.status(200).json({ message: "Produto deletado com sucesso" });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        await ProductsModel_1.ProductsModel.update(req.body, {
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Produto Atualizado com sucesso" });
    }
}
exports.default = new productController();
