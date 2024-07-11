"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DataLayerCsv = exports.DataLayerCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const dataLayerCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Condition: "notEmpty && unique",
    Type: "Int",
    ExportType: "CS",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "DataLayer",
    CnName: "DataLayer",
    Filter: "1",
    ExportType: "CS",
    RenderType: 21,
    Tip: "DataLayer名，需要地图中配置的DataLayer命名一致",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "CnName",
    CnName: "描述",
    Type: "String",
    RenderType: 21,
    Tip: "DataLayer描述",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "LevelId",
    CnName: "地图Id",
    Type: "Int",
    ExportType: "CS",
    RenderType: 40,
    Tip: "DataLayer所在的地图ID",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "InitLoad",
    CnName: "默认加载",
    Type: "Bool",
    ExportType: "CS",
    RenderType: 1,
    Tip: "新号是否默认加载该DataLayer",
  }),
];
class DataLayerCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("DataLayerCsv", dataLayerCsvFields);
  }
}
exports.DataLayerCsvLoader = DataLayerCsvLoader;
class DataLayerCsv extends CsvLoader_1.GlobalCsv {}
exports.DataLayerCsv = DataLayerCsv;
// # sourceMappingURL=DataLayerCsv.js.map
