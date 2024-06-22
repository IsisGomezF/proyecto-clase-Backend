"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate.fields");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const interaccion_controller_1 = require("../controllers/interaccion.controller");
//path/api/v1/Producto
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [
    (0, express_validator_1.check)("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    // check("fechaCreacion","La fecha de creacion es obligatoria").not().isEmpty(),
    // check("usuario","El usuario es obligatorio").not().isEmpty().isNumeric(),
    // check("cliente","El cliente es obligatorio").not().isEmpty().isNumeric(),
    validate_fields_1.validateFields
], interaccion_controller_1.crearInteraccion);
router.get("/", validate_jwt_1.validateJWT, interaccion_controller_1.getInteracciones);
router.get("/:id", validate_jwt_1.validateJWT, interaccion_controller_1.getUnaInteraccion);
router.put("/:id", validate_jwt_1.validateJWT, interaccion_controller_1.actualizarInteraccion);
router.delete("/:id", validate_jwt_1.validateJWT, interaccion_controller_1.eliminarInteraccion);
exports.default = router;
//# sourceMappingURL=interaccion.router.js.map