"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exportVarConfig = exports.getVarConfigArray = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  VarConfigCsv_1 = require("../CsvConfig/VarConfigCsv");
class VarConfigManager {
  constructor() {
    (this.Pe = []), this.Init();
  }
  static get Instance() {
    return (
      VarConfigManager.m || (VarConfigManager.m = new VarConfigManager()),
      VarConfigManager.m
    );
  }
  Init() {
    this.Pe = this.LoadVarConfig();
  }
  LoadVarConfig() {
    var r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      VarConfigCsv_1.VarConfigCsv,
    );
    const n = [];
    return (
      r.forEach((r) => {
        n.push([r.Name, r.Type]);
      }),
      n
    );
  }
  ExportVarConfig() {
    var r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      VarConfigCsv_1.VarConfigCsv,
    );
    const n = [];
    return (
      r.forEach((r) => {
        n.push({ Id: r.Id, Name: r.Name, Type: r.Type.toString() });
      }),
      { Items: n }
    );
  }
  get VarConfigArray() {
    return this.Pe;
  }
}
function getVarConfigArray() {
  return VarConfigManager.Instance.VarConfigArray;
}
function exportVarConfig() {
  return VarConfigManager.Instance.ExportVarConfig();
}
(exports.getVarConfigArray = getVarConfigArray),
  (exports.exportVarConfig = exportVarConfig);
//# sourceMappingURL=Var.js.map
