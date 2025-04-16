"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectConfigCsv = exports.EffectConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  effectConfigCsvFields = [
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
      CnName: "类型名称",
      Filter: "1",
      ExportType: "C",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "类型",
      Type: "Int",
      RenderType: 75,
      ExportType: "C",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Data",
      CnName: "内容",
      Type: "String",
      RenderType: 76,
      ExportType: "C",
    }),
  ];
class EffectConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("EffectConfigCsv", effectConfigCsvFields);
  }
}
exports.EffectConfigCsvLoader = EffectConfigCsvLoader;
class EffectConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.EffectConfigCsv = EffectConfigCsv;
//# sourceMappingURL=EffectConfigCsv.js.map
