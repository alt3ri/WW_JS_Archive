"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotHandBookCsv =
    exports.PlotHandBookCsvLoader =
    exports.EPlotHandBookModifyState =
    exports.plotHandBookManualStateCnMap =
    exports.EPlotHandBookManualState =
      void 0);
const CsvLoader_1 = require("./CsvLoader");
var EPlotHandBookManualState, EPlotHandBookModifyState;
!(function (e) {
  (e.Delete = "D"), (e.Add = "A"), (e.Empty = "");
})(
  (EPlotHandBookManualState =
    exports.EPlotHandBookManualState ||
    (exports.EPlotHandBookManualState = {})),
),
  (exports.plotHandBookManualStateCnMap = {
    [EPlotHandBookManualState.Delete]: "删除",
    [EPlotHandBookManualState.Add]: "新增",
    [EPlotHandBookManualState.Empty]: "无",
  }),
  (function (e) {
    (e.Deleted = "DEL"), (e.Additional = "ADD"), (e.Empty = "");
  })(
    (EPlotHandBookModifyState =
      exports.EPlotHandBookModifyState ||
      (exports.EPlotHandBookModifyState = {})),
  );
const plotHandBookCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Type",
    CnName: "类型",
    Filter: "1",
    Condition: "notEmpty",
    Type: "String",
    RenderType: 56,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "ChapterId",
    CnName: "章节ID",
    Filter: "1",
    Condition: "notEmpty",
    Type: "Int",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "BtData",
    CnName: "配置ID",
    Condition: "notEmpty",
    Type: "Array<String>",
    RenderType: 54,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "NodeId",
    CnName: "节点ID",
    Filter: "1",
    Condition: "notEmpty",
    Type: "Int",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "TidTip",
    CnName: "追踪文本",
    Type: "String",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "PlotFlow",
    CnName: "剧情文件",
    Condition: "notEmpty",
    Type: "Array<String>",
    RenderType: 55,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "IsHideUi",
    CnName: "隐藏步骤UI",
    Condition: "notEmpty",
    Type: "Bool",
    RenderType: 1,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "ManualState",
    CnName: "手动标记",
    Filter: "1",
    RenderType: 57,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "ModifyState",
    CnName: "变更状态",
    Filter: "1",
    RenderType: 58,
  }),
];
class PlotHandBookCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("PlotHandBookCsv", plotHandBookCsvFields);
  }
}
exports.PlotHandBookCsvLoader = PlotHandBookCsvLoader;
class PlotHandBookCsv extends CsvLoader_1.GlobalCsv {}
exports.PlotHandBookCsv = PlotHandBookCsv;
//# sourceMappingURL=PlotHandBookCsv.js.map
