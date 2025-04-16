"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleRidingRolesCsv = exports.VehicleRidingRolesCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  vehicleRidingRolesCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "角色ID",
      Type: "Int",
      Condition: "notEmpty && unique",
      ExportType: "CS",
      RenderType: 17,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CreatorId",
      CnName: "添加人",
      Type: "Int",
      Condition: "notEmpty",
      CreateType: "scheme",
      RenderType: 44,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Description",
      CnName: "描述",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TemplateId",
      CnName: "共乘角色模板ID",
      Type: "Int",
      RenderType: 19,
      ExportType: "CS",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "SkinTemplates",
      CnName: "共乘角色皮肤模板ID",
      Type: "Map<Int,Int>",
      ExportType: "CS",
      RenderType: 65,
    }),
  ];
class VehicleRidingRolesCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("VehicleRidingRolesCsv", vehicleRidingRolesCsvFields);
  }
}
exports.VehicleRidingRolesCsvLoader = VehicleRidingRolesCsvLoader;
class VehicleRidingRolesCsv extends CsvLoader_1.GlobalCsv {}
exports.VehicleRidingRolesCsv = VehicleRidingRolesCsv;
//# sourceMappingURL=VehicelRidingRolesCsv.js.map
