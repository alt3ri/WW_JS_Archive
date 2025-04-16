"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrokenRockRingCsv = exports.BrokenRockRingCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  brokenRockRingCsvFields = [
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
      Name: "InvalidBox",
      CnName: "无效区域",
      Type: "Array<IntArray>",
      ExportType: "C",
      Default: "[]",
      Tip: "一个圆环展开后有36个格子，通过列表配置其中指针不会运动到的区域",
      RenderType: 66,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RandomBox",
      CnName: "随机区域大小",
      Type: "Array<Int>",
      ExportType: "C",
      Tip: "一个圆环展开后有36个格子，随机生成N个格子大小的区域",
      RenderType: 67,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PerfectBox",
      CnName: "完美区域大小",
      Type: "Int",
      ExportType: "C",
      Tip: "随机生成的区域中，完美区域的大小",
      RenderType: 19,
      Default: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "BonusRate",
      CnName: "Bonus区域概率",
      Type: "Map<Int,Int>",
      Tip: "达到不同积分进度时，完美区域变成Bonus区域的概率",
      ExportType: "C",
      RenderType: 65,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "GoodScore",
      CnName: "良好区域积分",
      Type: "Int",
      ExportType: "C",
      RenderType: 19,
      Default: "10",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PerfectScore",
      CnName: "完美区域积分",
      Type: "Int",
      ExportType: "C",
      RenderType: 19,
      Default: "30",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "BonusScore",
      CnName: "Bonus区域积分",
      Type: "Int",
      ExportType: "C",
      RenderType: 19,
      Default: "10",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Speed",
      CnName: "积分：指针速度",
      Type: "Map<Int,Int>",
      Tip: "指针在达到不同积分进度时，运动速度可发生变化",
      ExportType: "C",
      RenderType: 65,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ColdTime",
      CnName: "击打冷却时间(ms)",
      Type: "Int",
      Tip: "击打按键点击有冷却时间，冷却时间内点击无响应",
      ExportType: "C",
      RenderType: 19,
      Default: "500",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MultiBoxGroup",
      CnName: "格子组",
      Type: "Int",
      Tip: "支持配置生成多组延续格子，当生成多组格子时，先随机N个等分点，以这些点作为起点生成连续格子。仅完整圆环（没有无效区域）读取该字段",
      ExportType: "C",
      RenderType: 19,
      Default: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Offset",
      CnName: "Ui偏移坐标",
      Type: "Array<Int>",
      ExportType: "C",
      RenderType: 67,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IsAnticlockwise",
      CnName: "是否逆时针转",
      RenderType: 1,
      Type: "Bool",
      Tip: "勾选后指针逆时针转，否则顺时针转",
    }),
  ];
class BrokenRockRingCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BrokenRockCsv", brokenRockRingCsvFields);
  }
}
exports.BrokenRockRingCsvLoader = BrokenRockRingCsvLoader;
class BrokenRockRingCsv extends CsvLoader_1.GlobalCsv {
  BaseCheck(r) {
    let o = super.BaseCheck(r);
    return (
      this.Rows.forEach((e) => {
        2 !== e.Offset.length &&
          (r.push(
            `Id为【${e.Id}】的配置字段【Ui偏移坐标】需按照[num,num]格式填写`,
          ),
          o++);
      }),
      o
    );
  }
}
exports.BrokenRockRingCsv = BrokenRockRingCsv;
//# sourceMappingURL=BrokenRockRing.js.map
