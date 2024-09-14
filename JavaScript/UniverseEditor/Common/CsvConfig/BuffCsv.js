"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffCsv = exports.BuffCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  buffCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Description",
      CnName: "描述",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "BuffId",
      CnName: "BuffId",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CreatorId",
      CnName: "添加人",
      Type: "Int",
      Condition: "notEmpty",
      CreateType: "scheme",
      RenderType: 43,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Remark",
      CnName: "备注",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
  ];
class BuffCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BuffCsv", buffCsvFields);
  }
}
exports.BuffCsvLoader = BuffCsvLoader;
class BuffCsv extends CsvLoader_1.GlobalCsv {}
exports.BuffCsv = BuffCsv;
//# sourceMappingURL=BuffCsv.js.map
