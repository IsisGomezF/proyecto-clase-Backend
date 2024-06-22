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
exports.eliminarUsuario = exports.actualizarUsuario = exports.getUnUsuario = exports.getUsuarios = exports.crearUsuario = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        const existeEmail = yield usuario_model_1.default.findOne({ email, password });
        if (existeEmail) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el email ${email}`
            });
        }
        const nuevoUsuario = new usuario_model_1.default(Object.assign({}, body));
        const salt = bcryptjs_1.default.genSaltSync(10);
        nuevoUsuario.password = bcryptjs_1.default.hashSync(password, salt);
        const usuarioCreado = yield nuevoUsuario.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado sastisfactoriamente",
            usuario: usuarioCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error, //Puede devolver informacion sensible
            msg: "Error al crear el usuario"
        });
    }
});
exports.crearUsuario = crearUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verUsuarios = yield usuario_model_1.default.find();
        res.json({
            ok: true,
            verUsuarios,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver el usuario"
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUnUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const verUsuario = yield usuario_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            verUsuario,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver el usuario"
        });
    }
});
exports.getUnUsuario = getUnUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const usuariosActualizado = yield usuario_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            usuario: usuariosActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuario"
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const usuarioEliminado = yield usuario_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Usuario Eliminado",
            usuario: usuarioEliminado
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario"
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.controller.js.map