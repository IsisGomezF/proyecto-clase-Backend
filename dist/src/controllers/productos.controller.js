"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.getUnProducto = exports.getProductos = exports.crearProducto = void 0;
;
const productos_model_1 = __importDefault(require("../models/productos.model"));
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    try {
        const nuevoProducto = new productos_model_1.default(Object.assign({ usuario: id }, body));
        const productoCreado = yield nuevoProducto.save();
        res.status(200).json({
            ok: true,
            msg: "Producto creado sastisfactoriamente",
            producto: productoCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error, //Puede devolver informacion sensible
            msg: "Error al crear el producto"
        });
    }
});
exports.crearProducto = crearProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const verProductos = yield productos_model_1.default.find().populate({
            path: "usuario",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            verProductos,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al ver los productos"
        });
    }
});
exports.getProductos = getProductos;
const getUnProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const verUnProducto = yield productos_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            verUnProducto,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver el producto"
        });
    }
});
exports.getUnProducto = getUnProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const productosActualizados = yield productos_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            producto: productosActualizados
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el producto"
        });
    }
});
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productoEliminado = yield productos_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Producto Eliminado",
            producto: productoEliminado
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el producto"
        });
    }
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.controller.js.map