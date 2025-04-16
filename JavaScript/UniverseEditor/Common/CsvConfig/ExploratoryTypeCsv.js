"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploratoryTypeCsv = exports.ExploratoryTypeCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  exploratoryTypeCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Key",
      CnName: "类型ID",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "类型名称",
      ExportType: "C",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "BelongType",
      CnName: "所属",
      Type: "Int",
      RenderType: 72,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "Desc", CnName: "描述" }),
  ];
class ExploratoryTypeCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ExploratoryTypeCsv", exploratoryTypeCsvFields);
  }
}
exports.ExploratoryTypeCsvLoader = ExploratoryTypeCsvLoader;
class ExploratoryTypeCsv extends CsvLoader_1.GlobalCsv {}
exports.ExploratoryTypeCsv = ExploratoryTypeCsv;
//# sourceMappingURL=ExploratoryTypeCsv.js.map
