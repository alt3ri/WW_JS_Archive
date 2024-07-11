"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TextListCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  textListCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Key",
      CnName: "主键",
      Type: "Long",
      Filter: "1",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FlowListId",
      CnName: "剧情名",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PlotLineId",
      CnName: "剧本文本Id",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "文本Id",
      Type: "Int",
      Filter: "1",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Text",
      CnName: "文本内容",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "Sound", CnName: "声音" }),
    (0, CsvLoader_1.createCsvField)({
      Name: "EsKey",
      CnName: "External Sources key",
      Default: "",
    }),
  ];
class TextListCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TextListCsv", textListCsvFields);
  }
}
exports.TextListCsvLoader = TextListCsvLoader;
//# sourceMappingURL=TextListCsv.js.map
