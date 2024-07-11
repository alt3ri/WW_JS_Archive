"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FaceExpressionCsv = exports.FaceExpressionCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  faceExpressionCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "SkeletalMesh",
      CnName: "Mesh",
      RenderType: 51,
      Type: "String",
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "表情备注",
      RenderType: 21,
      Type: "String",
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "表情描述",
      RenderType: 21,
      Type: "String",
      ExportType: "",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "FaceExpression",
      CnName: "表情",
      RenderType: 50,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MaleVariant",
      CnName: "男主变体",
      RenderType: 50,
    }),
  ];
class FaceExpressionCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("FaceExpressionCsv", faceExpressionCsvFields);
  }
}
exports.FaceExpressionCsvLoader = FaceExpressionCsvLoader;
class FaceExpressionCsv extends CsvLoader_1.GlobalCsv {}
exports.FaceExpressionCsv = FaceExpressionCsv;
//# sourceMappingURL=FaceExpressionCSV.js.map
