"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const UserModel_1 = require("./UserModel");
const CategoryModel = index_1.db.define("category", {
    id: {
        type: sequelize_1.DataTypes.STRING,
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
});
exports.CategoryModel = CategoryModel;
CategoryModel.belongsTo(UserModel_1.UserModel, {
    foreignKey: "user_ID",
});
