"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TagCsv = exports.TagCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  tagCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Tag",
      CnName: "Tag",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Description",
      CnName: "描述",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
  ];
class TagCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TagCsv", tagCsvFields);
  }
}
exports.TagCsvLoader = TagCsvLoader;
class TagCsv extends CsvLoader_1.GlobalCsv {}
exports.TagCsv = TagCsv;
//# sourceMappingURL=TagCsv.js.map
