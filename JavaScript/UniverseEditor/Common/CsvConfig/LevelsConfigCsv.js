"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelsConfigCsv = exports.LevelsConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  levelsConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MapId",
      CnName: "地图Id",
      Type: "Int",
      Tip: "【f.副本表】中【副本地图|AkiMapSource】分页的地图id",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "Desc", CnName: "地图描述" }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ContentPath",
      CnName: "地图路径",
      RenderType: 45,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IsPartition",
      CnName: "是否为大世界地图",
      RenderType: 1,
      Type: "Bool",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IsTest",
      CnName: "是否为测试地图",
      RenderType: 1,
      Type: "Bool",
    }),
  ];
class LevelsConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("LevelsConfigCsv", levelsConfigCsvFields);
  }
}
exports.LevelsConfigCsvLoader = LevelsConfigCsvLoader;
class LevelsConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.LevelsConfigCsv = LevelsConfigCsv;
//# sourceMappingURL=LevelsConfigCsv.js.map
