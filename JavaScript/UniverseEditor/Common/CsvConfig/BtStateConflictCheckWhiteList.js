"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BtStateConflictCheckWhiteListCsv =
    exports.BtStateConflictCheckWhiteListCsvLoader =
      void 0);
const CsvLoader_1 = require("./CsvLoader"),
  btStateConflictCheckWhiteListCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "EditorObjectUid",
      CnName: "对象",
      Type: "String",
      Filter: "1",
      Condition: "notEmpty && unique",
      CreateType: "scheme",
      RenderType: 59,
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
      Name: "CreateTime",
      CnName: "添加时间",
      Type: "Int",
      Condition: "notEmpty",
      CreateType: "scheme",
      RenderType: 53,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      Type: "String",
      CnName: "描述",
      Default: "",
    }),
  ];
class BtStateConflictCheckWhiteListCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super(
      "BtStateConflictCheckWhiteListCsv",
      btStateConflictCheckWhiteListCsvFields,
    );
  }
}
exports.BtStateConflictCheckWhiteListCsvLoader =
  BtStateConflictCheckWhiteListCsvLoader;
class BtStateConflictCheckWhiteListCsv extends CsvLoader_1.GlobalCsv {}
exports.BtStateConflictCheckWhiteListCsv = BtStateConflictCheckWhiteListCsv;
//# sourceMappingURL=BtStateConflictCheckWhiteList.js.map
