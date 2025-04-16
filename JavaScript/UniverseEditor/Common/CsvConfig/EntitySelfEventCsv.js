"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntitySelfEventCsv = exports.EntitySelfEventCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader"),
  entitySelfEventCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Filter: "1",
      Condition: "notEmpty && unique",
      Type: "Int",
      RenderType: 19,
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Key",
      CnName: "事件Key",
      Filter: "1",
      Condition: "notEmpty && unique",
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "事件名称",
      Filter: "1",
      Condition: "notEmpty && unique",
      ExportType: "CS",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "说明",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
  ];
class EntitySelfEventCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("EntitySelfEventCsv", entitySelfEventCsvFields);
  }
}
exports.EntitySelfEventCsvLoader = EntitySelfEventCsvLoader;
class EntitySelfEventCsv extends CsvLoader_1.GlobalCsv {}
exports.EntitySelfEventCsv = EntitySelfEventCsv;
//# sourceMappingURL=EntitySelfEventCsv.js.map
