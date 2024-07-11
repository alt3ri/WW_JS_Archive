"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherGameplayCsv = exports.CipherGameplayCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const cipherGameplayFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Password",
    CnName: "正确密码",
    Type: "Int",
    RenderType: 18,
  }),
];
class CipherGameplayCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("CipherGameplayCsv", cipherGameplayFields);
  }
}
exports.CipherGameplayCsvLoader = CipherGameplayCsvLoader;
class CipherGameplayCsv extends CsvLoader_1.GlobalCsv {}
exports.CipherGameplayCsv = CipherGameplayCsv;
// # sourceMappingURL=CipherGameplay.js.map
