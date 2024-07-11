"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimbreCsv = exports.TimbreCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  timbreCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "音色名",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "描述",
      ExportType: "",
    }),
  ];
class TimbreCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TimbreCsv", timbreCsvFields);
  }
}
exports.TimbreCsvLoader = TimbreCsvLoader;
class TimbreCsv extends CsvLoader_1.GlobalCsv {}
exports.TimbreCsv = TimbreCsv;
//# sourceMappingURL=TimbreCsv.js.map
