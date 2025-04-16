"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRouletteCsv = exports.FishingRouletteCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  fishingRouletteFields = [
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
      Name: "Comment",
      CnName: "备注",
      Type: "String",
      ExportType: "C",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RandomArea",
      CnName: "随机区域",
      Type: "Array<Int>",
      ExportType: "C",
      Default: "[]",
      Tip: "一个圆环展开后有 36个格子，通过列表配置其中指针可以操作命中的随机区域",
      RenderType: 67,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "InvalidArea",
      CnName: "无效区域",
      Type: "Array<IntArray>",
      ExportType: "C",
      Default: "[]",
      Tip: "一个圆环展开后有 36个格子，通过列表配置其中指针不会运动到的区域",
      RenderType: 66,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MaxScore",
      CnName: "积分上限",
      Type: "Int",
      ExportType: "C",
      Tip: "完成玩法所需要的积分",
      RenderType: 19,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HitAreaScore",
      CnName: "命中区域积分",
      Type: "Int",
      ExportType: "C",
      Tip: "命中区域的积分",
      RenderType: 19,
      Default: "10",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PerfectSize",
      CnName: "完美区域大小",
      Type: "Int",
      ExportType: "C",
      Tip: "完美区域的大小",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PerfectAppearRate",
      CnName: "完美区域出现概率",
      Type: "Map<Int,Int>",
      ExportType: "C",
      Tip: "完美区域出现的概率",
      RenderType: 65,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PerfectScore",
      CnName: "完美区域积分",
      Type: "Int",
      ExportType: "C",
      Tip: "完美区域的积分",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CursorSpeed",
      CnName: "成功次数：指针角速度",
      Type: "Map<Int,Int>",
      ExportType: "C",
      Tip: "指针角速度",
      RenderType: 65,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HitColdTime",
      CnName: "击打冷却时间（ms）",
      Type: "Int",
      ExportType: "C",
      Tip: "击打冷却时间",
      RenderType: 19,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ScoreUp",
      CnName: "积分自增长值（分/s）",
      Type: "Int",
      ExportType: "C",
      Tip: "积分自增长值",
      RenderType: 19,
      Default: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MultiBoxGroup",
      CnName: "格子组",
      Type: "Int",
      ExportType: "C",
      Tip: "格子组",
      RenderType: 19,
      Default: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HiddenInterval",
      CnName: "隐藏时间间隔（ms）",
      Type: "Array<Float>",
      ExportType: "C",
      Tip: "隔X毫秒隐藏Y毫秒，保持Z毫秒透明",
      RenderType: 80,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RouletteRotateSpeed",
      CnName: "每X毫秒: 转盘移动Y格",
      Type: "Map<Int,Int>",
      ExportType: "C",
      Tip: "隔X毫秒移动Y格",
      RenderType: 65,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MistakeScore",
      CnName: "失误扣分",
      Type: "Int",
      ExportType: "C",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IsAnticlockwise",
      CnName: "是否逆时针转",
      Type: "Bool",
      ExportType: "C",
      RenderType: 1,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RefreshType",
      CnName: "刷新模式",
      Tip: `整型：
0-不刷新
1-任意QTE结束后刷新
2-所有QTE结束后刷新`,
      Type: "Int",
      ExportType: "C",
      RenderType: 19,
    }),
  ];
class FishingRouletteCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("FishingRouletteCsv", fishingRouletteFields);
  }
}
exports.FishingRouletteCsvLoader = FishingRouletteCsvLoader;
class FishingRouletteCsv extends CsvLoader_1.GlobalCsv {}
exports.FishingRouletteCsv = FishingRouletteCsv;
//# sourceMappingURL=FishingRouletteCsv.js.map
