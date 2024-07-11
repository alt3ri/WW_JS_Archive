"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowListCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const flowListCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    ExportType: "C",
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    ExportType: "C",
    Name: "Json",
    CnName: "Json字符串",
    Filter: "0",
  }),
];
class FlowListCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("FlowListCsv", flowListCsvFields);
  }
}
exports.FlowListCsvLoader = FlowListCsvLoader;
// # sourceMappingURL=FlowListCsv.js.map
