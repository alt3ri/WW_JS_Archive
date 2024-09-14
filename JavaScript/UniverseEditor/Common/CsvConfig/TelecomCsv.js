"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleComCsv = exports.TeleComCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  textListCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "DescText",
      CnName: "描述",
      Type: "String",
      RenderType: 21,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Talker",
      CnName: "对话人",
      Type: "Int",
      RenderType: 39,
    }),
  ];
class TeleComCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TeleComCsv", textListCsvFields);
  }
}
exports.TeleComCsvLoader = TeleComCsvLoader;
class TeleComCsv extends CsvLoader_1.GlobalCsv {}
exports.TeleComCsv = TeleComCsv;
//# sourceMappingURL=TelecomCsv.js.map
