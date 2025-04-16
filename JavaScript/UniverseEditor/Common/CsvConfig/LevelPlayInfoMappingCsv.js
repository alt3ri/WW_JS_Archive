"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayInfoMappingCsv = exports.LevelPlayInfoMappingCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  levelPlayInfoMappingCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Filter: "1",
      Condition: "notEmpty && unique",
      Type: "Int",
      RenderType: 19,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "类型",
      Type: "Int",
      RenderType: 69,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Data",
      CnName: "内容",
      Type: "String",
      RenderType: 70,
      ExportType: "CS",
    }),
  ];
class LevelPlayInfoMappingCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("LevelPlayInfoMappingCsv", levelPlayInfoMappingCsvFields);
  }
}
exports.LevelPlayInfoMappingCsvLoader = LevelPlayInfoMappingCsvLoader;
class LevelPlayInfoMappingCsv extends CsvLoader_1.GlobalCsv {}
exports.LevelPlayInfoMappingCsv = LevelPlayInfoMappingCsv;
//# sourceMappingURL=LevelPlayInfoMappingCsv.js.map
