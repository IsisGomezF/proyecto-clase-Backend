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
exports.eliminarInteraccion = exports.actualizarInteraccion = exports.getUnaInteraccion = exports.getInteracciones = exports.crearInteraccion = void 0;
;
const interaccion_model_1 = __importDefault(require("../models/interaccion.model"));
const crearInteraccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // const {descripcion}=req.body
    const id = req._id;
    try {
        const nuevaInteraccion = new interaccion_model_1.default(Object.assign({ usuario: id }, body));
        const interaccionCreada = yield nuevaInteraccion.save();
        res.status(200).json({
            ok: true,
            msg: "Interaccion creada sastisfactoriamente",
            interaccion: interaccionCreada,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error, //Puede devolver informacion sensible
            msg: "Error al crear la interaccion"
        });
    }
});
exports.crearInteraccion = crearInteraccion;
const getInteracciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const verInteracciones = yield interaccion_model_1.default.find().populate({
            path: "usuario",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            verInteracciones: verInteracciones,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver las interacciones"
        });
    }
});
exports.getInteracciones = getInteracciones;
const getUnaInteraccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const verUnaInteraccion = yield interaccion_model_1.default.findById({ _id: id }).populate({
            path: "usuario",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            verUnaInteraccion: verUnaInteraccion,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver la interaccion"
        });
    }
});
exports.getUnaInteraccion = getUnaInteraccion;
const actualizarInteraccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const interaccionActualizadas = yield interaccion_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Interaccion actualizado",
            interaccion: interaccionActualizadas
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar la interaccion"
        });
    }
});
exports.actualizarInteraccion = actualizarInteraccion;
const eliminarInteraccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const interaccionEliminada = yield interaccion_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Interaccion Eliminada",
            interaccion: interaccionEliminada
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar la interaccion"
        });
    }
});
exports.eliminarInteraccion = eliminarInteraccion;
//# sourceMappingURL=interaccion.controller.js.map