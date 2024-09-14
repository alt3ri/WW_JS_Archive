"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorConditionModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleFavorConditionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Cqi = new Map());
  }
  UpdateRoleFavorCondtion(e, o) {
    var r = this.Cqi.get(e) ?? new Map(),
      t = o.oUs;
    for (const f of Object.keys(t)) {
      var s = Number(f),
        a = t[s].rUs,
        i = r.get(s) ?? new Map();
      for (const u of Object.keys(a)) {
        var n = Number(u),
          d = a[n].iUs,
          l = i.get(n) ?? [],
          v = d.length;
        for (let e = 0; e < v; e++) {
          var c = d[e];
          l.push(c);
        }
        i.set(n, l);
      }
      r.set(s, i);
    }
    this.Cqi.set(e, r);
  }
  IsCondtionFinish(e, o, r, t) {
    e = this.Cqi.get(e);
    if (e) {
      e = e.get(o);
      if (e) {
        var s = e.get(r);
        if (s) {
          var a = s.length;
          for (let e = 0; e < a; e++) if (s[e] === t) return !0;
        }
      }
    }
    return !1;
  }
}
exports.RoleFavorConditionModel = RoleFavorConditionModel;
//# sourceMappingURL=RoleFavorConditionModel.js.map
