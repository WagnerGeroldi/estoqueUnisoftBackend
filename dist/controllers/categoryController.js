"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const CategoryModel_1 = require("../database/model/CategoryModel");
const ProductsModel_1 = require("../database/model/ProductsModel");
class categoryController {
    async create(req, res) {
        const { name } = req.body;
        const { user_ID } = req.params;
        await CategoryModel_1.CategoryModel.create({
            id: (0, uuid_1.v4)(),
            name,
            user_ID,
        });
        return res
            .status(201)
            .json({ message: "Categoria cadastrada com sucesso" });
    }
    async findCategorys(req, res) {
        const { user_ID } = req.params;
        const allCategorys = await CategoryModel_1.CategoryModel.findAll({
            where: {
                user_ID: user_ID,
            },
            order: [["name", "ASC"]],
        });
        if (!allCategorys) {
            return res
                .status(400)
                .json({ message: "Não existem Categoria cadastrada" });
        }
        else {
            return res.status(200).json(allCategorys);
        }
    }
    async findById(req, res) {
        const { id } = req.params;
        const category = await CategoryModel_1.CategoryModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(category);
    }
    async delete(req, res) {
        const { id } = req.params;
        const category = await ProductsModel_1.ProductsModel.findOne({
            where: {
                category_ID: id,
            },
        });
        if (!category) {
            await CategoryModel_1.CategoryModel.destroy({
                where: {
                    id: id,
                },
            });
            return res
                .status(200)
                .json({ message: "Categoria deletada com sucesso" });
        }
        else {
            return res
                .status(400)
                .json({ message: "Categoria está em uso e não pode ser deletada" });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        await CategoryModel_1.CategoryModel.update(req.body, {
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Categoria Atualizada com sucesso" });
    }
    async verifyCategoryExists(req, res, next) {
        const { name } = req.body;
        await CategoryModel_1.CategoryModel.count({
            where: {
                name: name,
            },
        }).then((count) => {
            if (count != 0) {
                return res.status(400).json({ message: "Categoria já cadastrada" });
            }
            else {
                next();
            }
        });
    }
}
exports.default = new categoryController();
