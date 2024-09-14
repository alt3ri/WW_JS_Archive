"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PackIdCsvCsv = exports.PackIdCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  packIdCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      RenderType: 18,
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PackId",
      CnName: "投放Id",
      Type: "Int",
      Condition: "notEmpty",
      RenderType: 18,
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "LevelId",
      CnName: "地图Id",
      Type: "Int",
      Condition: "notEmpty",
      RenderType: 41,
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      Type: "String",
      CnName: "描述",
      Default: "",
      ExportType: "",
    }),
  ];
class PackIdCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("PackIdCsv", packIdCsvFields);
  }
}
exports.PackIdCsvLoader = PackIdCsvLoader;
class PackIdCsvCsv extends CsvLoader_1.GlobalCsv {}
exports.PackIdCsvCsv = PackIdCsvCsv;
//# sourceMappingURL=PackIdCsv.js.map
