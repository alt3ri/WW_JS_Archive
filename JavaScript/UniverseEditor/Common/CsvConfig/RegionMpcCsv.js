"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegionMpcCsv = exports.RegionMpcCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  regionMpcCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      ExportType: "CS",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "配置描述",
      ExportType: "",
      Condition: "notEmpty && unique",
      RenderType: 21,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RegionId",
      CnName: "区域Id",
      Type: "Int",
      ExportType: "CS",
      RenderType: 45,
    }),
    (0, CsvLoader_1.createCsvField)({
      ExportType: "CS",
      Name: "MpcData",
      CnName: "MPC材质DA",
      RenderType: 44,
    }),
  ];
class RegionMpcCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("RegionMpcCsv", regionMpcCsvFields);
  }
}
exports.RegionMpcCsvLoader = RegionMpcCsvLoader;
class RegionMpcCsv extends CsvLoader_1.GlobalCsv {}
exports.RegionMpcCsv = RegionMpcCsv;
//# sourceMappingURL=RegionMpcCsv.js.map
