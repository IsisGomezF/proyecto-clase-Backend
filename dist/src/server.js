"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conection_1 = require("./database/conection");
const cors_1 = __importDefault(require("cors"));
const usuario_router_1 = __importDefault(require("./routes/usuario.router"));
const productos_router_1 = __importDefault(require("./routes/productos.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const interaccion_router_1 = __importDefault(require("./routes/interaccion.router"));
class Server {
    constructor() {
        this.apiPath = {
            usuario: "/api/v1/usuario",
            productos: "/api/v1/productos",
            login: "/api/v1/login",
            interacciones: "/api/v1/interacciones"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        //Base de datos
        (0, conection_1.dbConection)();
        //metodos iniciales 
        this.middlewares();
        //rutas
        this.routes();
    }
    routes() {
        this.app.use(this.apiPath.usuario, usuario_router_1.default);
        this.app.use(this.apiPath.productos, productos_router_1.default);
        this.app.use(this.apiPath.login, auth_router_1.default);
        this.app.use(this.apiPath.interacciones, interaccion_router_1.default);
    }
    miPrimerApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "Api funcionando" }));
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.miPrimerApi();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map