"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiTextCsv = exports.MultiTextCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const multiTextCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "用于索引表的唯一id",
    Filter: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "DescText",
    CnName: "备注",
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({ Name: "zh-Hans", CnName: "中文" }),
  (0, CsvLoader_1.createCsvField)({ Name: "en", CnName: "英文" }),
  (0, CsvLoader_1.createCsvField)({ Name: "ja", CnName: "日语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "ko", CnName: "韩语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "ru", CnName: "俄语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "zh-Hant", CnName: "繁中" }),
  (0, CsvLoader_1.createCsvField)({ Name: "de", CnName: "德语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "es", CnName: "西班牙语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "pt", CnName: "葡萄牙语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "id", CnName: "印尼语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "fr", CnName: "法语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "vi", CnName: "越南语" }),
  (0, CsvLoader_1.createCsvField)({ Name: "th", CnName: "泰语" }),
];
class MultiTextCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("MultiTextCsvLoader", multiTextCsvFields);
  }
}
exports.MultiTextCsvLoader = MultiTextCsvLoader;
class MultiTextCsv extends CsvLoader_1.GlobalCsv {}
exports.MultiTextCsv = MultiTextCsv;
// # sourceMappingURL=MultiTextCsv.js.map
