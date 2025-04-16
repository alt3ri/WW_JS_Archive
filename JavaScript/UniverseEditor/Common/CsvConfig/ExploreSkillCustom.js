"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillCustomCsv = exports.ExploreSkillCustomCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  exploreSkillCustomCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      ExportType: "CS",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Tag",
      CnName: "标签",
      Type: "String",
      Condition: "notEmpty",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "Desc", CnName: "描述" }),
  ];
class ExploreSkillCustomCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ExploreSkillCustomCsv", exploreSkillCustomCsvFields);
  }
}
exports.ExploreSkillCustomCsvLoader = ExploreSkillCustomCsvLoader;
class ExploreSkillCustomCsv extends CsvLoader_1.GlobalCsv {}
exports.ExploreSkillCustomCsv = ExploreSkillCustomCsv;
//# sourceMappingURL=ExploreSkillCustom.js.map
