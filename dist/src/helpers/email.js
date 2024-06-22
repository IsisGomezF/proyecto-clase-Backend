"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = require("../config/config");
const mailer_1 = require("../config/mailer");
const environment = config_1.config[process.env.NODE_ENV || "desarrollo"];
const { email, from } = environment.email;
const sendEmail = (to, subject, html) => {
    mailer_1.transporter.sendMail({
        from: `${from} <${email}>`,
        to,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo", error);
        }
        else {
            console.log("Correo enviado");
            console.info(info.envelope);
        }
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map