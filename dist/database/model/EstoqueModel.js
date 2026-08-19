"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const EstoqueModel = index_1.db.define("estoque_cidade", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    estoque: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
});
exports.EstoqueModel = EstoqueModel;
