"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UserModel_1 = require("../database/model/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const HandleEmailService_1 = __importDefault(require("../services/email/HandleEmailService"));
const generatePassword_1 = require("../services/email/generatePassword");
class userController {
    async create(req, res) {
        const { name, email } = req.body;
        HandleEmailService_1.default.runPassInitial(email, name, generatePassword_1.passProvisional);
        const passwordCript = await bcrypt_1.default.hash(generatePassword_1.passProvisional, 10);
        UserModel_1.UserModel.create({
            id: (0, uuid_1.v4)(),
            name,
            email,
            password: passwordCript,
            updatePass: false,
            lastAcess: new Date(),
        });
        return res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    async findAll(req, res) {
        const allUsers = await UserModel_1.UserModel.findAll();
        return res.status(200).json(allUsers);
    }
    async findById(req, res) {
        const { id } = req.params;
        const user = await UserModel_1.UserModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).json(user);
    }
    async delete(req, res) {
        const { id } = req.params;
        const user = await UserModel_1.UserModel.findOne({
            where: {
                id: id,
            },
        });
        const deleteUser = await UserModel_1.UserModel.destroy({
            where: {
                id: id,
            },
        });
        if (!deleteUser) {
            return res.status(404).json({ message: "Usuário não cadastrado" });
        }
        else {
            HandleEmailService_1.default.runInfoDeleteAccount(user);
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        await UserModel_1.UserModel.update(req.body, {
            where: {
                id: id,
            },
        });
        const user = await UserModel_1.UserModel.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Usuário Atualizado com sucesso", user, auth: true });
    }
}
exports.default = new userController();
