"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkIconCsv = exports.TalkIconCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const talkIconCsvFields = [
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
    CnName: "类型",
    Type: "String",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Icon",
    CnName: "图标",
    Type: "String",
    RenderType: 15,
  }),
];
class TalkIconCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TalkIconCsv", talkIconCsvFields);
  }
}
exports.TalkIconCsvLoader = TalkIconCsvLoader;
class TalkIconCsv extends CsvLoader_1.GlobalCsv {}
exports.TalkIconCsv = TalkIconCsv;
// # sourceMappingURL=TalkIconCsv.js.map
