"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideGroupFixConfigCsv = exports.HideGroupFixConfigCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  hideGroupFixFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      ExportType: "CS",
      Tip: "唯一标识",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "类型",
      Type: "String",
      Condition: "notEmpty",
      ExportType: "S",
      Tip: "清场对象类型",
      RenderType: 84,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Target",
      CnName: "目标",
      Type: "String",
      Filter: "1",
      Condition: "notEmpty",
      ExportType: "S",
      Tip: "清场对象",
      RenderType: 85,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Remark",
      CnName: "备注",
      Type: "String",
      Condition: "notEmpty",
      ExportType: "C",
      Tip: "备注",
    }),
  ];
class HideGroupFixConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("HideGroupFixConfigCsv", hideGroupFixFields);
  }
}
exports.HideGroupFixConfigCsvLoader = HideGroupFixConfigCsvLoader;
class HideGroupFixConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.HideGroupFixConfigCsv = HideGroupFixConfigCsv;
//# sourceMappingURL=HideGroupFixConfigCsv.js.map
