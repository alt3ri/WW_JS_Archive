"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SexFormatCsv = exports.SexFormatCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  sexFormatCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "MaleText",
      CnName: "男性文本",
      Filter: "1",
      Type: "String",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FemaleText",
      CnName: "女性文本",
      Filter: "1",
      Type: "String",
      Condition: "notEmpty && unique",
    }),
  ];
class SexFormatCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SexFormatCsv", sexFormatCsvFields);
  }
}
exports.SexFormatCsvLoader = SexFormatCsvLoader;
class SexFormatCsv extends CsvLoader_1.GlobalCsv {}
exports.SexFormatCsv = SexFormatCsv;
//# sourceMappingURL=SexFormat.js.map
