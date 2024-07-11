"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkyboxCsv = exports.SkyboxCsvLoader = void 0);
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
      Name: "Name",
      CnName: "天气类型",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "StaticSkybox",
      CnName: "固定天空盒",
      RenderType: 36,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "DynamicSkybox",
      CnName: "动态天空盒",
      RenderType: 37,
    }),
  ];
class SkyboxCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SkyboxCsv", textListCsvFields);
  }
}
exports.SkyboxCsvLoader = SkyboxCsvLoader;
class SkyboxCsv extends CsvLoader_1.GlobalCsv {}
exports.SkyboxCsv = SkyboxCsv;
//# sourceMappingURL=SkyboxCsv.js.map
