"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridItemShapeCsv = exports.GridItemShapeCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  gridItemShapeCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      ExportType: "CS",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Note",
      CnName: "形状备注",
      RenderType: 22,
      Type: "String",
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FillState",
      CnName: "格子占用情况",
      Type: "Array<IntArray>",
      ExportType: "CS",
      Default: "[]",
      Tip: "待补充Tips",
      RenderType: 78,
    }),
  ];
class GridItemShapeCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("GridItemShapeCsv", gridItemShapeCsvFields);
  }
}
exports.GridItemShapeCsvLoader = GridItemShapeCsvLoader;
class GridItemShapeCsv extends CsvLoader_1.GlobalCsv {}
exports.GridItemShapeCsv = GridItemShapeCsv;
//# sourceMappingURL=GridItemShapeCsv.js.map
