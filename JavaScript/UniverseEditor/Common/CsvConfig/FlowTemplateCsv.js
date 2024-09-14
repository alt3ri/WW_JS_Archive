"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowTemplateCsv = exports.FlowTemplateCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  flowTemplateCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Enable",
      CnName: "可用",
      RenderType: 1,
      Type: "Bool",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Template",
      CnName: "模板类型",
      RenderType: 21,
      Type: "String",
      Tip: "旧数据根据人数定义:[3人模板]，新数据根据站位定义:[1v1]，[3v2]",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CameraType",
      CnName: "镜头类型",
      RenderType: 31,
      Default: "None",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ContentPath",
      CnName: "模板文件",
      RenderType: 12,
    }),
  ];
class FlowTemplateCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("FlowTemplateCsv", flowTemplateCsvFields);
  }
}
exports.FlowTemplateCsvLoader = FlowTemplateCsvLoader;
class FlowTemplateCsv extends CsvLoader_1.GlobalCsv {}
exports.FlowTemplateCsv = FlowTemplateCsv;
//# sourceMappingURL=FlowTemplateCsv.js.map
