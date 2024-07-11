"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getAllPerformanceAttributeTagsByType =
    exports.getAllPerformanceAttributeTypes =
    exports.EntityPrefabPerformanceUtil =
      void 0);
const IAction_1 = require("../../Interface/IAction"),
  CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  EntityPerformanceAttributeCsv_1 = require("../CsvConfig/EntityPerformanceAttributeCsv");
class EntityPrefabPerformanceUtil {
  static get EntityPrefabPerformanceTypes() {
    return EntityPrefabPerformanceUtil._e;
  }
  static get pe() {
    var t = EntityPrefabPerformanceUtil.ue;
    if (0 === t.size)
      for (const n of Object.entries(IAction_1.entityPrefabPerformanceConfig)) {
        var e = new Map(),
          r = (t.set(n[0], e), Object.entries(n[1]));
        for (const a of r) e.set(a[0], a[1]);
      }
    return t;
  }
  static GetPerformanceListByType(t) {
    t = EntityPrefabPerformanceUtil.pe.get(t);
    return t ? Array.from(t.keys()) : [];
  }
  static GetEntityPrefabPerformanceKeyByTag(t, e) {
    var r,
      n,
      a = EntityPrefabPerformanceUtil.pe.get(t);
    if (!a)
      throw new Error(`GetEntityPrefabPerformanceKeyByTag: ${t} not found`);
    for ([r, n] of a) if (n === e) return r;
    throw new Error(`GetEntityPrefabPerformanceKeyByTag: ${e} not found`);
  }
  static GetEntityPrefabPerformanceTag(t, e) {
    var r = IAction_1.entityPrefabPerformanceConfig[t];
    if (r) return r[e];
    throw new Error(`GetEntityPrefabPerformanceTag: ${t} not found`);
  }
  static IsPerformanceTypeContainTag(t, e) {
    var r = EntityPrefabPerformanceUtil.GetPerformanceListByType(t),
      t = EntityPrefabPerformanceUtil.GetEntityPrefabPerformanceKeyByTag(t, e);
    return r?.includes(t);
  }
}
function getAllPerformanceAttributeTypes() {
  var t = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    EntityPerformanceAttributeCsv_1.EntityPerformanceAttributeCsv,
  );
  const e = [];
  return (
    t.forEach((t) => {
      e.push(t.Type);
    }),
    e
  );
}
function getAllPerformanceAttributeTagsByType(e) {
  var t = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    EntityPerformanceAttributeCsv_1.EntityPerformanceAttributeCsv,
  ).find((t) => t.Type === e);
  return t ? t.Tags : [];
}
((exports.EntityPrefabPerformanceUtil = EntityPrefabPerformanceUtil)._e =
  Object.keys(IAction_1.entityPrefabPerformanceConfig)),
  (EntityPrefabPerformanceUtil.ue = new Map()),
  (exports.getAllPerformanceAttributeTypes = getAllPerformanceAttributeTypes),
  (exports.getAllPerformanceAttributeTagsByType =
    getAllPerformanceAttributeTagsByType);
//# sourceMappingURL=EntityPrefabPerformance.js.map
