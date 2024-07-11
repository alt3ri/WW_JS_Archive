"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomSeqCsv = exports.CustomSeqCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  customSeqCsvFields = [
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
      CnName: "名字",
      Filter: "1",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "SeqDataPath",
      CnName: "SeqData文件",
      Filter: "0",
      RenderType: 20,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "BinderType",
      CnName: "目标绑定类型",
      Filter: "0",
      RenderType: 2,
    }),
  ];
class CustomSeqCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("CustomSeqCsv", customSeqCsvFields);
  }
}
exports.CustomSeqCsvLoader = CustomSeqCsvLoader;
class CustomSeqCsv extends CsvLoader_1.GlobalCsv {}
exports.CustomSeqCsv = CustomSeqCsv;
//# sourceMappingURL=CustomSeqCsv.js.map
