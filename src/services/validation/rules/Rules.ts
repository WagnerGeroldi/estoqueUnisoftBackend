import { body } from "express-validator";

class HandleRules {
  bodyRulesLogin = [
    body("email")
      .isEmail()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("EMAIL INVÁLIDO"),
    body("password")
      .isString()
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 8 })
      .withMessage("Senha deve ter pelo menos 8 dígitos"),
  ];

  bodyRulesRegister = [
    body("name")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Nome Inválido"),
    body("email")
      .isEmail()
      .notEmpty()
      .escape()
      .trim()
      .toLowerCase()
      .withMessage("EMAIL INVÁLIDO"),
  ];

  bodyRulesRegisterClient = [
    body("name")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Nome Inválido"),

    body("phone")
      .isString()
      .isLength({ min: 11 })
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Telefone INVÁLIDO"),

    body("cpf")
      .isString()
      .isLength({ min: 11 })
      .notEmpty()
      .escape()
      .trim()
      .withMessage("CPF INVÁLIDO"),

    body("birthday")
      .isString()
      .isLength({ min: 8 })
      .notEmpty()
      .trim()
      .withMessage("Data de Nascimento INVÁLIDA"),

    body("address")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Endereço INVÁLIDO"),

    body("cep")
      .isString()
      .isLength({ min: 8 })
      .notEmpty()
      .escape()
      .trim()
      .withMessage("CEP INVÁLIDO"),

    body("city")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Cidade INVÁLIDO"),

    body("houseNumber")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Número INVÁLIDO"),

    body("country")
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Estado INVÁLIDO"),
  ];

}

export default new HandleRules();
