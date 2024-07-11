"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorConditionModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleFavorConditionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Cbi = new Map());
  }
  UpdateRoleFavorCondtion(e, o) {
    const r = this.Cbi.get(e) ?? new Map();
    const t = o.wLs;
    for (const f of Object.keys(t)) {
      const s = Number(f);
      const a = t[s].ULs;
      const i = r.get(s) ?? new Map();
      for (const u of Object.keys(a)) {
        const n = Number(u);
        const d = a[n].PLs;
        const l = i.get(n) ?? [];
        const v = d.length;
        for (let e = 0; e < v; e++) {
          const c = d[e];
          l.push(c);
        }
        i.set(n, l);
      }
      r.set(s, i);
    }
    this.Cbi.set(e, r);
  }
  IsCondtionFinish(e, o, r, t) {
    e = this.Cbi.get(e);
    if (e) {
      e = e.get(o);
      if (e) {
        const s = e.get(r);
        if (s) {
          const a = s.length;
          for (let e = 0; e < a; e++) if (s[e] === t) return !0;
        }
      }
    }
    return !1;
  }
}
exports.RoleFavorConditionModel = RoleFavorConditionModel;
// # sourceMappingURL=RoleFavorConditionModel.js.map
