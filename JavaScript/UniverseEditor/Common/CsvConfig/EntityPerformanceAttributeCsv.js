"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityPerformanceAttributeCsv =
    exports.EntityPerformanceAttributeCsvLoader =
      void 0);
const CsvLoader_1 = require("./CsvLoader"),
  entityPerformanceAttributeCsvFields = [
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
      CnName: "Type",
      Filter: "1",
      Condition: "notEmpty && unique",
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
      Name: "Description",
      CnName: "描述",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Tags",
      CnName: "表现Tag",
      Type: "Array<Int>",
      RenderType: 59,
    }),
  ];
class EntityPerformanceAttributeCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("EntityPerformanceAttributeCsv", entityPerformanceAttributeCsvFields);
  }
}
exports.EntityPerformanceAttributeCsvLoader =
  EntityPerformanceAttributeCsvLoader;
class EntityPerformanceAttributeCsv extends CsvLoader_1.GlobalCsv {}
exports.EntityPerformanceAttributeCsv = EntityPerformanceAttributeCsv;
//# sourceMappingURL=EntityPerformanceAttributeCsv.js.map
