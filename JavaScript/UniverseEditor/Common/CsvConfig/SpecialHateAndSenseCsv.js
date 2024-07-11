"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialHateAndSenseCsv = exports.SpecialHateAndSenseCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  specialHateAndSenseCsvFields = [
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
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AiHateId",
      CnName: "仇恨Id",
      Type: "Int",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FirstAiSenseId",
      CnName: "基础感知Id",
      Type: "Int",
      RenderType: 18,
    }),
  ];
class SpecialHateAndSenseCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SpecialHateAndSenseCsv", specialHateAndSenseCsvFields);
  }
}
exports.SpecialHateAndSenseCsvLoader = SpecialHateAndSenseCsvLoader;
class SpecialHateAndSenseCsv extends CsvLoader_1.GlobalCsv {}
exports.SpecialHateAndSenseCsv = SpecialHateAndSenseCsv;
//# sourceMappingURL=SpecialHateAndSenseCsv.js.map
