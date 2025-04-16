"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherGameplayCsv = exports.CipherGameplayCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  cipherGameplayFields = [
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
      RenderType: 19,
      Tip: "如果小于4位数，在运行时，客户端会自动补充前导零，使得数字的总长度保持为4，如输入10，实际密码为0010",
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
//# sourceMappingURL=CipherGameplay.js.map
