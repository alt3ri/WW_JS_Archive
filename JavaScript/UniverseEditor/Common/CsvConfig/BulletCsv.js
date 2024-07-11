"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCsv = exports.BulletCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  bulletCsvFields = [
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
      Name: "BulletId",
      CnName: "子弹Id",
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
      RenderType: 42,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Remark",
      CnName: "备注",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
  ];
class BulletCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BulletCsv", bulletCsvFields);
  }
}
exports.BulletCsvLoader = BulletCsvLoader;
class BulletCsv extends CsvLoader_1.GlobalCsv {}
exports.BulletCsv = BulletCsv;
//# sourceMappingURL=BulletCsv.js.map
