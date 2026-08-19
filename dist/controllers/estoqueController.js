"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EstoqueModel_1 = require("../database/model/EstoqueModel");
class estoqueController {
    async create(req, res) {
        const { estoque } = req.body;
        await EstoqueModel_1.EstoqueModel.create({
            estoque,
        });
        return res
            .status(201)
            .json({ message: "Estoque cadastrada com sucesso" });
    }
    async findEstoque(req, res) {
        const allCategorys = await EstoqueModel_1.EstoqueModel.findAll();
        if (!allCategorys) {
            return res
                .status(400)
                .json({ message: "Não existem Estoque cadastrada" });
        }
        else {
            return res.status(200).json(allCategorys);
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        const category = await EstoqueModel_1.EstoqueModel.findOne({
            where: {
                category_ID: id,
            },
        });
        if (!category) {
            await EstoqueModel_1.EstoqueModel.destroy({
                where: {
                    id: id,
                },
            });
            return res
                .status(200)
                .json({ message: "Estoque deletada com sucesso" });
        }
        else {
            return res
                .status(400)
                .json({ message: "EstoqueModel está em uso e não pode ser deletada" });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        await EstoqueModel_1.EstoqueModel.update(req.body, {
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Categoria Atualizada com sucesso" });
    }
    async verifyCategoryExists(req, res, next) {
        const { estoque } = req.body;
        await EstoqueModel_1.EstoqueModel.count({
            where: {
                name: estoque,
            },
        }).then((count) => {
            if (count != 0) {
                return res.status(400).json({ message: "Estoque já cadastrada" });
            }
            else {
                next();
            }
        });
    }
}
exports.default = new estoqueController();
