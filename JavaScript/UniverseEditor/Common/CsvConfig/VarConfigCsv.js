"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VarConfigCsv = exports.VarConfigCsvLoader = void 0);
const IVar_1 = require("../../Interface/IVar"),
  Util_1 = require("../Misc/Util"),
  CsvLoader_1 = require("./CsvLoader"),
  varConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "变量名",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 61,
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
      RenderType: 24,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "DefaultValue",
      CnName: "变量初始值",
      Tip: "变量的初始值。\n不填时为没有初始值，需要策划用行为手动设置一次后才能使用（不设置时比较变量条件失效）",
      RenderType: 25,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HasDefaultValue",
      CnName: "是否有初始值",
      Tip: "兼容旧版本配置用，新加的变量默认为true，1.3之前的版本变量默认为false\n如果为false，变量需要策划在手动设置一次后才生效。",
      RenderType: 1,
      Type: "Bool",
      Default: "true",
    }),
  ];
class VarConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("VarConfigCsv", varConfigCsvFields);
  }
  OnModifyRow(e, r) {
    "Type" === r && this.re(e);
  }
  re(e) {
    let r = e.DefaultValue;
    (r =
      "" === e.DefaultValue && "String" !== e.Type
        ? (0, IVar_1.getVarDefaultValue)(e.Type)
        : (0, Util_1.parseVarValue)(e.Type, e.DefaultValue)),
      (e.DefaultValue = r.toString());
  }
}
exports.VarConfigCsvLoader = VarConfigCsvLoader;
class VarConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.VarConfigCsv = VarConfigCsv;
//# sourceMappingURL=VarConfigCsv.js.map
