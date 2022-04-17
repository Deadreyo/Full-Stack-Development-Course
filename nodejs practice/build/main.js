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
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyAPI = 'AIzaSyCJuiVyOmkWA671Jlo_7leK71iBSbTmy7o';
        const fileId = '1b3o_r6uGRyFWRRKyTH86e9hcaGcqqm7i';
        const link = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${keyAPI}&alt=media`;
        // const link = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        try {
            const data = yield (0, node_fetch_1.default)(link);
            const status = yield data.statusText;
            const buffer = yield data.buffer();
            console.log(data);
            console.log(`status: `, status);
            // console.log(`text: `, data.text);
            let filePath = `${__dirname}/../file.pdf`;
            (0, fs_1.writeFile)(filePath, buffer, () => {
                console.log(filePath);
            });
        }
        catch (e) {
            console.log(`ERROR: `, e);
        }
    });
}
exports.default = test;
test();
