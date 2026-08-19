"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const CategoryModel_1 = require("./CategoryModel");
const UserModel_1 = require("./UserModel");
const ProductsModel = index_1.db.define("products", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
    fornecedor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoryProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estoque: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.ProductsModel = ProductsModel;
ProductsModel.belongsTo(CategoryModel_1.CategoryModel, {
    foreignKey: "category_ID",
});
ProductsModel.belongsTo(UserModel_1.UserModel, {
    foreignKey: "user_ID",
    onDelete: "CASCADE",
});
