"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbpOverlayMontageCsv =
    exports.AbpMontageCsv =
    exports.AbpMontageCsvLoader =
    exports.MontageCsv =
    exports.MontageCsvLoader =
      void 0);
const CsvLoader_1 = require("./CsvLoader"),
  montageCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ModelId",
      CnName: "模型Id",
      RenderType: 31,
      Type: "Int",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ModelName",
      CnName: "模型",
      RenderType: 21,
      Type: "String",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Emotion",
      CnName: "表情",
      RenderType: 21,
      Type: "String",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ActionMontage",
      CnName: "动作蒙太奇",
      RenderType: 27,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ExpressionMontage",
      CnName: "表情蒙太奇",
      RenderType: 27,
    }),
  ];
class MontageCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("MontageCsv", montageCsvFields);
  }
}
exports.MontageCsvLoader = MontageCsvLoader;
class MontageCsv extends CsvLoader_1.GlobalCsv {}
exports.MontageCsv = MontageCsv;
const abpMontageCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Abp",
    CnName: "ABP",
    RenderType: 28,
    Type: "String",
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "动作备注",
    RenderType: 21,
    Type: "String",
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Desc",
    CnName: "动作描述",
    RenderType: 21,
    Type: "String",
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Montage",
    CnName: "蒙太奇",
    RenderType: 27,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "MaleVariant",
    CnName: "男主变体",
    RenderType: 27,
  }),
];
class AbpMontageCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("AbpMontageCsv", abpMontageCsvFields);
  }
}
exports.AbpMontageCsvLoader = AbpMontageCsvLoader;
class AbpMontageCsv extends CsvLoader_1.GlobalCsv {}
exports.AbpMontageCsv = AbpMontageCsv;
class AbpOverlayMontageCsv extends CsvLoader_1.GlobalCsv {}
exports.AbpOverlayMontageCsv = AbpOverlayMontageCsv;
//# sourceMappingURL=MontageCsv.js.map
