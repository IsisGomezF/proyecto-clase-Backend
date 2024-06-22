"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_controller_1 = require("../controllers/productos.controller");
const validate_fields_1 = require("../middlewares/validate.fields");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = require("../middlewares/validate-jwt");
//path/api/v1/Producto
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("sku", "El SKU de documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("cantidad", "La cantidad es obligatoria").not().isEmpty().isNumeric(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    validate_fields_1.validateFields
], productos_controller_1.crearProducto);
router.get("/", productos_controller_1.getProductos);
router.get("/:id", productos_controller_1.getUnProducto);
router.put("/:id", productos_controller_1.actualizarProducto);
router.delete("/:id", productos_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.router.js.map