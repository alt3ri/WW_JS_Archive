"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TidTextCsv = exports.TidTextListCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  tidTextListCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Key",
      CnName: "主键",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TextKey",
      CnName: "文本key",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TidText",
      CnName: "文本内容",
      Localization: "1",
    }),
  ];
class TidTextListCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TidTextListCsv", tidTextListCsvFields);
  }
}
exports.TidTextListCsvLoader = TidTextListCsvLoader;
class TidTextCsv extends CsvLoader_1.GlobalCsv {}
exports.TidTextCsv = TidTextCsv;
//# sourceMappingURL=TidTextCsv.js.map
