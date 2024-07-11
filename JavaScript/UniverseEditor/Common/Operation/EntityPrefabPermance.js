"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityPrefabPerformanceUtil = void 0);
const IAction_1 = require("../../Interface/IAction");
class EntityPrefabPerformanceUtil {
  static get EntityPrefabPerformanceTypes() {
    return EntityPrefabPerformanceUtil._e;
  }
  static get pe() {
    const r = EntityPrefabPerformanceUtil.ue;
    if (r.size === 0)
      for (const n of Object.entries(IAction_1.entityPrefabPerformanceConfig)) {
        const t = new Map();
        const e = (r.set(n[0], t), Object.entries(n[1]));
        for (const a of e) t.set(a[0], a[1]);
      }
    return r;
  }
  static GetPerformanceListByType(r) {
    r = EntityPrefabPerformanceUtil.pe.get(r);
    return r ? Array.from(r.keys()) : [];
  }
  static GetEntityPrefabPerformanceKeyByTag(r, t) {
    let e;
    let n;
    const a = EntityPrefabPerformanceUtil.pe.get(r);
    if (!a)
      throw new Error(`GetEntityPrefabPerformanceKeyByTag: ${r} not found`);
    for ([e, n] of a) if (n === t) return e;
    throw new Error(`GetEntityPrefabPerformanceKeyByTag: ${t} not found`);
  }
  static GetEntityPrefabPerformanceTag(r, t) {
    const e = IAction_1.entityPrefabPerformanceConfig[r];
    if (e) return e[t];
    throw new Error(`GetEntityPrefabPerformanceTag: ${r} not found`);
  }
  static IsPerformanceTypeContainTag(r, t) {
    const e = EntityPrefabPerformanceUtil.GetPerformanceListByType(r);
    var r = EntityPrefabPerformanceUtil.GetEntityPrefabPerformanceKeyByTag(
      r,
      t,
    );
    return e?.includes(r);
  }
}
((exports.EntityPrefabPerformanceUtil = EntityPrefabPerformanceUtil)._e =
  Object.keys(IAction_1.entityPrefabPerformanceConfig)),
  (EntityPrefabPerformanceUtil.ue = new Map());
// # sourceMappingURL=EntityPrefabPermance.js.map
