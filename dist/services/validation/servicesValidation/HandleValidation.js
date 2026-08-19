"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class HandleValidation {
    verifyValitadion(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(405).json({ errors: errors.array() });
        }
        next();
    }
}
exports.default = new HandleValidation();
