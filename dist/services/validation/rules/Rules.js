"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class HandleRules {
    constructor() {
        this.bodyRulesLogin = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("EMAIL INVÁLIDO"),
            (0, express_validator_1.body)("password")
                .isString()
                .notEmpty()
                .trim()
                .escape()
                .isLength({ min: 8 })
                .withMessage("Senha deve ter pelo menos 8 dígitos"),
        ];
        this.bodyRulesRegister = [
            (0, express_validator_1.body)("name")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Nome Inválido"),
            (0, express_validator_1.body)("email")
                .isEmail()
                .notEmpty()
                .escape()
                .trim()
                .toLowerCase()
                .withMessage("EMAIL INVÁLIDO"),
        ];
        this.bodyRulesRegisterClient = [
            (0, express_validator_1.body)("name")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Nome Inválido"),
            (0, express_validator_1.body)("phone")
                .isString()
                .isLength({ min: 11 })
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Telefone INVÁLIDO"),
            (0, express_validator_1.body)("cpf")
                .isString()
                .isLength({ min: 11 })
                .notEmpty()
                .escape()
                .trim()
                .withMessage("CPF INVÁLIDO"),
            (0, express_validator_1.body)("birthday")
                .isString()
                .isLength({ min: 8 })
                .notEmpty()
                .trim()
                .withMessage("Data de Nascimento INVÁLIDA"),
            (0, express_validator_1.body)("address")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Endereço INVÁLIDO"),
            (0, express_validator_1.body)("cep")
                .isString()
                .isLength({ min: 8 })
                .notEmpty()
                .escape()
                .trim()
                .withMessage("CEP INVÁLIDO"),
            (0, express_validator_1.body)("city")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Cidade INVÁLIDO"),
            (0, express_validator_1.body)("houseNumber")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Número INVÁLIDO"),
            (0, express_validator_1.body)("country")
                .isString()
                .notEmpty()
                .escape()
                .trim()
                .withMessage("Estado INVÁLIDO"),
        ];
    }
}
exports.default = new HandleRules();
