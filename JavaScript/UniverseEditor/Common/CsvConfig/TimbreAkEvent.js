"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimbreAkEventCsv = exports.TimbreAkEventCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  timbreAkEventCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TimberId",
      CnName: "音色Id",
      Type: "Int",
      Filter: "1",
      RenderType: 49,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "描述",
      Filter: "1",
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "UniversalToneId",
      CnName: "通用语气台本Id",
      Type: "Int",
      Filter: "1",
      RenderType: 50,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AkEvent",
      CnName: "音频事件",
      RenderType: 34,
    }),
  ];
class TimbreAkEventCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TimbreAkEventCsv", timbreAkEventCsvFields);
  }
}
exports.TimbreAkEventCsvLoader = TimbreAkEventCsvLoader;
class TimbreAkEventCsv extends CsvLoader_1.GlobalCsv {}
exports.TimbreAkEventCsv = TimbreAkEventCsv;
//# sourceMappingURL=TimbreAkEvent.js.map
