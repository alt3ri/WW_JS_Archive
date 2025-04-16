"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TermCsv = exports.TermCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  termCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Term",
      CnName: "术语",
      Filter: "1",
      Condition: "notEmpty && unique",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TermDesc",
      CnName: "术语解释",
      ExportType: "",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Color",
      CnName: "颜色",
      Type: "String",
      RenderType: 22,
    }),
  ];
class TermCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TermCsv", termCsvFields);
  }
}
exports.TermCsvLoader = TermCsvLoader;
class TermCsv extends CsvLoader_1.GlobalCsv {}
exports.TermCsv = TermCsv;
//# sourceMappingURL=TermCsv.js.map
