"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpineBackgroundCsv = exports.SpineBackgroundCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  spineBackgroundCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Remark",
      CnName: "备注",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "UiPrefabId",
      CnName: "UI预制体",
      Type: "String",
      RenderType: 71,
      Tip: "引用u.UI资源.csv（Tables目录下，非Csv编辑器中）中的Id",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AnimationName",
      CnName: "动画名",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "UiPrefabIdMaleVariant",
      CnName: "UI预制体(男主变体)",
      Type: "String",
      RenderType: 71,
      Tip: "引用u.UI资源.csv（Tables目录下，非Csv编辑器中）中的Id",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AnimationNameMaleVariant",
      CnName: "动画名(男主变体)",
      Type: "String",
      RenderType: 22,
    }),
  ];
class SpineBackgroundCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SpineBackgroundCsv", spineBackgroundCsvFields);
  }
}
exports.SpineBackgroundCsvLoader = SpineBackgroundCsvLoader;
class SpineBackgroundCsv extends CsvLoader_1.GlobalCsv {}
exports.SpineBackgroundCsv = SpineBackgroundCsv;
//# sourceMappingURL=SpineBackgroundCsv.js.map
