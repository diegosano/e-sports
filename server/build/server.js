"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ads', (request, response) => {
    return response.json([{ teste: 'acessou ads' }]);
});
app.listen(3333, () => {
    console.log('server started on port 3333');
});
