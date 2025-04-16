"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exportVarConfig = exports.getVarConfigArray = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  VarConfigCsv_1 = require("../CsvConfig/VarConfigCsv"),
  EventSystem_1 = require("../Misc/EventSystem"),
  Util_1 = require("../Misc/Util");
class VarConfigManager {
  constructor() {
    (this.Pe = []),
      (this.z$ = (r) => {
        r === CsvRegistry_1.ECsvName.Var && this.Refresh();
      }),
      this.Init(),
      EventSystem_1.editorEventDispatcher.Reg("SaveCsvEditor", this.z$);
  }
  static get Instance() {
    return (
      VarConfigManager.m || (VarConfigManager.m = new VarConfigManager()),
      VarConfigManager.m
    );
  }
  Init() {
    this.Refresh();
  }
  Refresh() {
    this.Pe = this.LoadVarConfig();
  }
  LoadVarConfig() {
    var r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      VarConfigCsv_1.VarConfigCsv,
    );
    const e = [];
    return (
      r.forEach((r) => {
        e.push({
          Name: r.Name,
          Type: r.Type,
          DefaultValue: r.HasDefaultValue ? r.DefaultValue : void 0,
        });
      }),
      e
    );
  }
  ExportVarConfig() {
    var r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      VarConfigCsv_1.VarConfigCsv,
    );
    const t = [];
    return (
      r.forEach((r) => {
        var e;
        r.HasDefaultValue &&
          ((e = r.Type),
          t.push({
            Name: r.Name,
            Type: e,
            Value: (0, Util_1.parseVarValue)(e, r.DefaultValue),
            Access: 2,
          }));
      }),
      { Vars: t }
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
