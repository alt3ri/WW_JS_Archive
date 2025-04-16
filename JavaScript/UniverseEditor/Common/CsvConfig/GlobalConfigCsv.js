"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GlobalConfigCsv = exports.GlobalConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  globalConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "变量名",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "说明",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "变量类型",
      Condition: "notEmpty",
      RenderType: 3,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Value",
      CnName: "值",
      RenderType: 11,
    }),
  ];
class GlobalConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("GlobalConfigCsv", globalConfigCsvFields);
  }
}
exports.GlobalConfigCsvLoader = GlobalConfigCsvLoader;
class GlobalConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.GlobalConfigCsv = GlobalConfigCsv;
//# sourceMappingURL=GlobalConfigCsv.js.map
