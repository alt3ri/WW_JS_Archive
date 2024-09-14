"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exportVarConfig = exports.getVarConfigArray = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  VarConfigCsv_1 = require("../CsvConfig/VarConfigCsv"),
  Util_1 = require("../Misc/Util");
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
    const a = [];
    return (
      r.forEach((r) => {
        a.push([r.Name, r.Type]);
      }),
      a
    );
  }
  ExportVarConfig() {
    var r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      VarConfigCsv_1.VarConfigCsv,
    );
    const e = [];
    return (
      r.forEach((r) => {
        var a;
        r.HasDefaultValue &&
          ((a = r.Type),
          e.push({
            Name: r.Name,
            Type: a,
            Value: (0, Util_1.parseVarValue)(a, r.DefaultValue),
            Access: 2,
          }));
      }),
      { Vars: e }
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
