"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const index_1 = require("../index");
const UserModel = index_1.db.define("users", {
    id: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo não pode ser vazio!",
            },
        },
    },
    lastAcess: {
        type: sequelize_1.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    newAcess: {
        type: sequelize_1.DATE,
        defaultValue: new Date()
    }
});
exports.UserModel = UserModel;
