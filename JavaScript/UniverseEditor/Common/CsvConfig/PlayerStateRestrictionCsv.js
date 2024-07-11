"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerStateRestrictionCsv = exports.PlayerStateRestrictionCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  standbyTagCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "类型",
      Type: "String",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 21,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IncludedTags",
      CnName: "必须包含的Tag",
      Type: "Array<String>",
      RenderType: 35,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ExcludedTags",
      CnName: "必须排除的Tag",
      Type: "Array<String>",
      RenderType: 35,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CreatorId",
      CnName: "添加人",
      Type: "Int",
      Condition: "notEmpty",
      CreateType: "scheme",
      RenderType: 42,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Remark",
      CnName: "备注",
      Condition: "notEmpty && unique",
    }),
  ];
class PlayerStateRestrictionCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("StandbyTagCsv", standbyTagCsvFields);
  }
}
exports.PlayerStateRestrictionCsvLoader = PlayerStateRestrictionCsvLoader;
class PlayerStateRestrictionCsv extends CsvLoader_1.GlobalCsv {}
exports.PlayerStateRestrictionCsv = PlayerStateRestrictionCsv;
//# sourceMappingURL=PlayerStateRestrictionCsv.js.map
