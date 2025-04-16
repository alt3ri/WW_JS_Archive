"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SystemVarConfigCsv = exports.SystemVarConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  systemVarConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ModuleName",
      CnName: "系统模块名",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 87,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "变量名",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 62,
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
      RenderType: 25,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Readonly",
      CnName: "是否只读",
      Tip: "是否在关卡侧只读，即不可在行为树中修改变量值",
      RenderType: 1,
      Type: "Bool",
      Default: "true",
    }),
  ];
class SystemVarConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SystemVarConfigCsv", systemVarConfigCsvFields);
  }
}
exports.SystemVarConfigCsvLoader = SystemVarConfigCsvLoader;
class SystemVarConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.SystemVarConfigCsv = SystemVarConfigCsv;
//# sourceMappingURL=SystemVarConfigCsv.js.map
