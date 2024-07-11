"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleTagConfigCsv = exports.BattleTagConfigCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  battleTagConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Filter: "1",
      Type: "Int",
      ExportType: "CS",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "描述",
      Condition: "notEmpty && unique",
      RenderType: 21,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AddTag",
      CnName: "发送Tag",
      ExportType: "CS",
      Condition: "notEmpty",
      Tip: "执行ExecBattleAction时发送的关卡tag事件。战斗感知到事件后自行判断行为",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FinishTag",
      CnName: "检测完成Tag",
      ExportType: "CS",
      Tip: "执行ExecBattleAction，假如action配置同步进行，会等待战斗发送此Tag事件后，行为才算完成",
    }),
  ];
class BattleTagConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BattleTagConfigCsv", battleTagConfigCsvFields);
  }
}
exports.BattleTagConfigCsvLoader = BattleTagConfigCsvLoader;
class BattleTagConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.BattleTagConfigCsv = BattleTagConfigCsv;
//# sourceMappingURL=BattleTagConfigCsv.js.map
