"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkerCsv = exports.TalkerCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  textListCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "NameStringKey",
      CnName: "说话人文本Key（开发中）",
      Filter: "1",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "说话人",
      Filter: "1",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CameraBindTag",
      CnName: "镜头绑定Tag",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HeadIconAsset",
      CnName: "头像资源",
      RenderType: 13,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HeadRoundIconAsset",
      CnName: "圆形头像资源",
      RenderType: 14,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "RolePileIconAsset",
      CnName: "半身像资源",
      RenderType: 16,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TitleStringKey",
      CnName: "称号文本Key（开发中）",
      Filter: "1",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Title",
      CnName: "称号",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TimberId",
      CnName: "音色Id",
      Type: "Int",
      Default: "0",
      RenderType: 49,
    }),
  ];
class TalkerCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("TalkerCsv", textListCsvFields);
  }
}
exports.TalkerCsvLoader = TalkerCsvLoader;
class TalkerCsv extends CsvLoader_1.GlobalCsv {}
exports.TalkerCsv = TalkerCsv;
//# sourceMappingURL=TalkerCsv.js.map
