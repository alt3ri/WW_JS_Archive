"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UniversalToneCsv = exports.UniversalToneCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const universalToneCsvFields = [
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
    CnName: "通用语音台本",
    Filter: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Desc",
    CnName: "描述",
    ExportType: "",
  }),
];
class UniversalToneCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("UniversalToneCsv", universalToneCsvFields);
  }
}
exports.UniversalToneCsvLoader = UniversalToneCsvLoader;
class UniversalToneCsv extends CsvLoader_1.GlobalCsv {}
exports.UniversalToneCsv = UniversalToneCsv;
// # sourceMappingURL=UniversalTone.js.map
