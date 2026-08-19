"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const UserModel_1 = require("./UserModel");
const UpdateStockModel = index_1.db.define("update_stock", {
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
    product_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.UpdateStockModel = UpdateStockModel;
UpdateStockModel.belongsTo(UserModel_1.UserModel, {
    foreignKey: "user_ID",
    onDelete: "CASCADE",
});
