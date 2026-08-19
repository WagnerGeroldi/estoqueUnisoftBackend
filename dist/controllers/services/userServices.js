"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../../database/model/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatePassword_1 = require("../../services/email/generatePassword");
const HandleEmailService_1 = __importDefault(require("../../services/email/HandleEmailService"));
class userServices {
    async verifyEmailExsits(req, res, next) {
        const { email } = req.body;
        await UserModel_1.UserModel.count({
            where: {
                email: email,
            },
        }).then((count) => {
            if (count != 0) {
                return res.status(400).json({ message: "Email já cadastrado" });
            }
            else {
                next();
            }
        });
    }
    async verifyIdExists(req, res, next) {
        const { id } = req.params;
        await UserModel_1.UserModel.count({
            where: {
                id: id,
            },
        }).then((count) => {
            if (count == 0) {
                return res.status(400).json({ message: "Usuário não cadastrado" });
            }
            else {
                next();
            }
        });
    }
    async recoverPassword(req, res) {
        const { email } = req.body;
        const user = await UserModel_1.UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            res.status(400).json({ message: "Email não cadastrado" });
        }
        else {
            HandleEmailService_1.default.runPassProvisional(user, generatePassword_1.passProvisional);
            const passwordCript = await bcrypt_1.default.hash(generatePassword_1.passProvisional, 10);
            await UserModel_1.UserModel.update({
                password: passwordCript,
                updatePass: true,
            }, {
                where: {
                    email: email,
                },
            });
            res.status(200).json({ message: "Enviamos um email com sua nova senha" });
        }
    }
    async verifyUpdatePassword(req, res, next) {
        const { password, newpassword } = req.body.data;
        const { id } = req.body.user;
        const user = await UserModel_1.UserModel.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            res.status(400).json({ message: "Erro: Usuário não cadastrado" });
        }
        const result = await bcrypt_1.default.compare(password, user.getDataValue("password"));
        if (result === true) {
            const passwordCript = await bcrypt_1.default.hash(newpassword, 10);
            await UserModel_1.UserModel.update({
                password: passwordCript,
                updatePass: false,
            }, {
                where: {
                    id: id,
                },
            });
            const dataUser = {
                email: user.email,
                name: user.name,
                update: new Date(),
            };
            HandleEmailService_1.default.runInfoUpdatePassword(dataUser);
            res.status(201).json({ message: "Senha atualizada com sucesso" });
        }
        else {
            res.status(400).json({ message: "Algo deu errado, tente novamente" });
        }
    }
    async handleLogin(req, res) {
        const { email, password } = req.body;
        const user = await UserModel_1.UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            res.status(400).json({ message: "Usuário não cadastrado" });
        }
        else {
            const result = await bcrypt_1.default.compare(password, user.getDataValue("password"));
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.SECRET, {
                expiresIn: 10000,
            });
            if (user.dataValues.updatePass === true && result === true) {
                res.status(300).json({
                    message: "Redirecionando para troca de senha",
                    auth: true,
                    token,
                    user,
                });
            }
            else {
                await UserModel_1.UserModel.update({
                    newAcess: new Date(),
                    lastAcess: user.newAcess,
                }, {
                    where: {
                        email: email,
                    },
                });
                result === true
                    ? res.status(200).json({ auth: true, token, user })
                    : res.status(401).send(false);
            }
        }
    }
    verifyJWT(req, res, next) {
        const token = req.headers["x-access-token"];
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Usuário não autenticado" });
            }
            else {
                next();
            }
        });
    }
}
exports.default = new userServices();
