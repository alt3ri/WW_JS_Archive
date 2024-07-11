"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VarConfigCsv = exports.VarConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const varConfigCsvFields = [
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
    CnName: "变量名",
    Filter: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Desc",
    CnName: "说明",
    Filter: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Type",
    CnName: "变量类型",
    Condition: "notEmpty",
    RenderType: 24,
  }),
];
class VarConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("VarConfigCsv", varConfigCsvFields);
  }
}
exports.VarConfigCsvLoader = VarConfigCsvLoader;
class VarConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.VarConfigCsv = VarConfigCsv;
// # sourceMappingURL=VarConfigCsv.js.map
