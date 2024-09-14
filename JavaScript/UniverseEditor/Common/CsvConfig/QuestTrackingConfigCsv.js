"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestTrackingConfigCsv = exports.QuestTrackingConfigCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  questTrackingConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PreQuestIds",
      CnName: "前置任务",
      Type: "Array<Int>",
      RenderType: 63,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TrackQuestId",
      CnName: "追踪任务",
      Type: "Int",
      CreateType: "scheme",
      RenderType: 62,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "描述",
      Type: "String",
      Default: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Priority",
      CnName: "优先级",
      Type: "Int",
      Default: "0",
      RenderType: 18,
    }),
  ];
class QuestTrackingConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("QuestTrackingConfigCsv", questTrackingConfigCsvFields);
  }
}
exports.QuestTrackingConfigCsvLoader = QuestTrackingConfigCsvLoader;
class QuestTrackingConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.QuestTrackingConfigCsv = QuestTrackingConfigCsv;
//# sourceMappingURL=QuestTrackingConfigCsv.js.map
