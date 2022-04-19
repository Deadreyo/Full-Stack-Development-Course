"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var students_1 = __importDefault(require("./api/students"));
var teachers_1 = __importDefault(require("./api/teachers"));
var routes = express_1.default.Router();
function middleWare(req, res, next) {
    console.log(req.url, " was visited");
}
routes.get('/', middleWare);
routes.use('/students', students_1.default);
routes.use('/teachers', teachers_1.default);
exports.default = routes;
