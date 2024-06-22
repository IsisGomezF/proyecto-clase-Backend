require("dotenv").config();

export const config:any ={
    pruebas:{
        database:{
            connection:process.env.DB_CONECTION,
        },
        email:{
            port: process.env.PORT_EMAIL_PRUEBAS,
            host: process.env.HOST_EMAIL_PRUEBAS,
            email: process.env.USER_EMAIL_PRUEBAS,
            password: process.env.PASS_EMAIL_PRUEBAS,
            from: process.env.FROM_EMAIL_PRUEBAS
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass:  process.env.JWT_SECRET_PASS,
        ipAPI: process.env.IP_API
    },
    desarrollo:{
        database:{
            connection:process.env.DB_CONECTION,
        },
        email:{
            port: process.env.PORT_EMAIL_DESARROLLO,
            host: process.env.HOST_EMAIL_DESARROLLO,
            email: process.env.USER_EMAIL_DESARROLLO,
            password: process.env.PASS_EMAIL_DESARROLLO,
            from: process.env.FROM_EMAIL_DESARROLLO
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass:  process.env.JWT_SECRET_PASS,
        ipAPI: process.env.IP_API,
        ip: process.env.IP
    },
    produccion:{
        databse:{
            connection:process.env.DB_CONECTION,
        },
        email:{
            port:'',
            host:'',
            email:'',
            password:''
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass:  process.env.JWT_SECRET_PASS,
        ipAPI: process.env.IP_API
    }    
}
