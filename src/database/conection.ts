import mongoose, { Error } from "mongoose";

export const dbConection = async () =>{
    try {
        const dbURL = process.env.DB_CONECTION; 

        if(!dbURL){
        throw new Error("Error en la conexion a la base de datos, no existe la URL");
    }
    await mongoose.connect(dbURL)
        console.log("Db Onnline");        
    } catch (Error) {
    console.log(Error);
    console.log("Error en la conexion a la base de datos");
    }
    
}