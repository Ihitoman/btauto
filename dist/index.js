"use strict";
const express = require('express');
const app = express();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

app.set('port', process.env.PORT || 3000);
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const enviroment_1 = require("./global/enviroment");
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Asginando Servicios de Rutas
server.app.use('/', router_1.default);
//Configurarción de cors
server.app.use(cors_1.default({
    origin: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    headers: true,
    exposeHeaders: false,
    credentials: false,
    maxAge: 90
    }));
server.start(() => {
    console.log(`Servidor Corriendo en el puerto ${app.get('port')}`);
});
