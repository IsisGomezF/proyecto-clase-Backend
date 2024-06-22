"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UbicacionSchema = new mongoose_1.Schema({
    country: {
        type: String,
        required: false,
    },
    countryCode: {
        type: String,
        required: false,
    },
    region: {
        type: String,
        required: false,
    },
    regionName: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: false,
    },
    lon: {
        type: String,
        required: false,
    },
    timezone: {
        type: String,
        required: false,
    },
    isp: {
        type: String,
        required: false,
    },
    org: {
        type: String,
        required: false,
    },
    as: {
        type: String,
        required: false,
    },
    query: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
});
const UbicacionModel = (0, mongoose_1.model)("ubicacion", exports.UbicacionSchema);
exports.default = UbicacionModel;
//# sourceMappingURL=ubicaciosIp.model.js.map