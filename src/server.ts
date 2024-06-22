import express, { Application, Request, Response } from "express";
import { dbConection } from "./database/conection";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.router"
import productosRoutes from "./routes/productos.router"
import authRoutes from "./routes/auth.router"
import interaccionesRoutes from "./routes/interaccion.router"



class Server {
  private app: Application;
  private port: string;
  private apiPath = {
    usuario:"/api/v1/usuario",
    productos:"/api/v1/productos",
    login:"/api/v1/login",
    interacciones:"/api/v1/interacciones"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000"
    //Base de datos
    dbConection()
    //metodos iniciales 
    this.middlewares();
    //rutas
    this.routes();
  }
  routes():void{
    this.app.use(this.apiPath.usuario, usuarioRoutes);
    this.app.use(this.apiPath.productos, productosRoutes);
    this.app.use(this.apiPath.login, authRoutes );
    this.app.use(this.apiPath.interacciones, interaccionesRoutes );

    

  }

  miPrimerApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Api funcionando" })
    );
  }
  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.miPrimerApi();

  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

export default Server;
