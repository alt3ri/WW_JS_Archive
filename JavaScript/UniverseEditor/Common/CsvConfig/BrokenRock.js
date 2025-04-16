"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrokenRockCsv = exports.BrokenRockCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  brokenRockCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      ExportType: "CS",
      Tip: "唯一标识",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Rings",
      CnName: "环列表",
      Type: "Array<Int>",
      ExportType: "C",
      Tip: "该玩法下拥有的交互的环列表，引用p.破碎岩石圆环",
      RenderType: 67,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ScoreMax",
      CnName: "积分上限",
      Type: "Int",
      ExportType: "C",
      Tip: "完成玩法所需要的积分",
      RenderType: 19,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ScoreUp",
      CnName: "积分自动增长(分/s)",
      Type: "Int",
      ExportType: "C",
      Tip: "玩法进程中随时间自动增长的积分",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ScoreDown",
      CnName: "失误扣分",
      Type: "Int",
      ExportType: "C",
      Tip: "每次点击失败后扣除的积分",
      RenderType: 19,
      Default: "20",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "GlobalTime",
      CnName: "游戏时长",
      Type: "Int",
      ExportType: "C",
      Tip: "单局游戏时长，0代表不计时",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "NormalSkill",
      CnName: "普通攻击技能",
      Type: "Int",
      ExportType: "C",
      Tip: "游玩过程中角色释放的技能",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FinishSkill",
      CnName: "终结技能",
      Type: "Int",
      ExportType: "C",
      Tip: "积分达到上限后释放的技能",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "EntityUid",
      CnName: "关联实体",
      Type: "String",
      Filter: "1",
      Condition: "notEmpty && unique",
      CreateType: "scheme",
      RenderType: 7,
    }),
  ];
class BrokenRockCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BrokenRockCsv", brokenRockCsvFields);
  }
}
exports.BrokenRockCsvLoader = BrokenRockCsvLoader;
class BrokenRockCsv extends CsvLoader_1.GlobalCsv {}
exports.BrokenRockCsv = BrokenRockCsv;
//# sourceMappingURL=BrokenRock.js.map
