"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate.fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
//path/api/v1/usuario
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El correo electronico es obligatorio").not().isEmpty().isEmail(),
    validate_fields_1.validateFields
], usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuarios);
router.get("/:id", validate_jwt_1.validateJWT, usuario_controller_1.getUnUsuario);
router.put("/:id", validate_jwt_1.validateJWT, usuario_controller_1.actualizarUsuario);
router.delete("/:id", validate_jwt_1.validateJWT, usuario_controller_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map