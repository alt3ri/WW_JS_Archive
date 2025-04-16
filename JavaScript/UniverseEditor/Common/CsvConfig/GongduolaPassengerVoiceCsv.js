"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaPassengerVoiceCsv =
    exports.GongduolaPassengerVoiceCsvLoader =
      void 0);
const CsvLoader_1 = require("./CsvLoader"),
  gongduolaPassengerVoiceCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RoleId",
      CnName: "角色ID",
      Filter: "1",
      Type: "Int",
      RenderType: 83,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TriggerType",
      CnName: "触发类型",
      Filter: "1",
      Type: "Int",
      RenderType: 74,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PlotFlow",
      CnName: "D级剧情",
      Type: "Array<String>",
      RenderType: 56,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Voice",
      CnName: "纯语音表现",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Priority",
      CnName: "优先级",
      Filter: "1",
      Condition: "notEmpty",
      Type: "Int",
      RenderType: 19,
    }),
  ];
class GongduolaPassengerVoiceCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("GongduolaPassengerVoiceCsv", gongduolaPassengerVoiceCsvFields);
  }
}
exports.GongduolaPassengerVoiceCsvLoader = GongduolaPassengerVoiceCsvLoader;
class GongduolaPassengerVoiceCsv extends CsvLoader_1.GlobalCsv {}
exports.GongduolaPassengerVoiceCsv = GongduolaPassengerVoiceCsv;
//# sourceMappingURL=GongduolaPassengerVoiceCsv.js.map
