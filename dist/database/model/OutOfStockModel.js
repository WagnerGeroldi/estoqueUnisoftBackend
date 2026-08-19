"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfStockModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const UserModel_1 = require("./UserModel");
const OutOfStockModel = index_1.db.define("out_of_stock", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    product: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.OutOfStockModel = OutOfStockModel;
OutOfStockModel.belongsTo(UserModel_1.UserModel, {
    foreignKey: "user_ID",
    onDelete: "CASCADE",
});
