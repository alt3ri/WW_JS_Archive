"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MotionModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class MotionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.cqi = new Map()),
      (this.mqi = new Map()),
      (this.dqi = new Map()),
      (this.Cqi = new Map());
  }
  OnMotionUnlock(t, o) {
    this.gqi(t, o),
      this.fqi(t, o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateRoleFavorData,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UnLockRoleFavorItem,
        t,
        o,
      );
  }
  OnNewMotionCanUnlock(t, o) {
    this.gqi(t, o), this.pqi(t, o);
  }
  OnRoleMotionActive(o) {
    o.lUs.hUs.forEach((t) => {
      this.gqi(o.lUs.Q6n, t.s5n),
        t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemLocked
          ? this.vqi(o.lUs.Q6n, t.s5n)
          : t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemUnLocked
            ? this.fqi(o.lUs.Q6n, t.s5n)
            : t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemCanUnLock &&
              this.pqi(o.lUs.Q6n, t.s5n);
    });
  }
  OnGetAllRoleMotionInfo(t) {
    this.cqi.clear(),
      this.dqi.clear(),
      this.mqi.clear(),
      t._Us.forEach((o) => {
        o.hUs.forEach((t) => {
          this.gqi(o.Q6n, t.s5n),
            t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemLocked
              ? this.vqi(o.Q6n, t.s5n)
              : t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemUnLocked
                ? this.fqi(o.Q6n, t.s5n)
                : t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemCanUnLock &&
                  this.pqi(o.Q6n, t.s5n);
        });
      });
    var o = t.zPs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  OnMotionFinishCondition(t) {
    var o = t.zPs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  GetRoleMotionState(t, o) {
    let e = this.cqi.get(t);
    return e && e.has(o)
      ? 2
      : (!(e = this.dqi.get(t)) || !e.has(o)) &&
          (e = this.mqi.get(t)) &&
          e.has(o)
        ? 1
        : 0;
  }
  IsCondtionFinish(t, o, e) {
    t = this.Cqi.get(t);
    if (t) {
      t = t.get(0);
      if (t) {
        var i = t.get(o);
        if (i) {
          var n = i.length;
          for (let t = 0; t < n; t++) if (i[t] === e) return !0;
        }
      }
    }
    return !1;
  }
  UpdateCondition(t, o) {
    var e = this.Cqi.get(t) ?? new Map(),
      i = o.oUs;
    for (const M of Object.keys(i)) {
      var n = Number(M),
        r = i[n].rUs,
        s = e.get(n) ?? new Map();
      for (const _ of Object.keys(r)) {
        var h = Number(_),
          a = r[h].iUs,
          v = s.get(h) ?? [],
          l = a.length;
        for (let t = 0; t < l; t++) {
          var c = a[t];
          v.push(c);
        }
        s.set(h, v);
      }
      e.set(n, s);
    }
    this.Cqi.set(t, e);
  }
  gqi(t, o) {
    var e = this.cqi.get(t),
      e = (e && e.delete(o), this.dqi.get(t)),
      e = (e && e.delete(o), this.mqi.get(t));
    e && e.delete(o);
  }
  fqi(t, o) {
    var e = this.cqi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.cqi.set(t, e));
  }
  pqi(t, o) {
    var e = this.mqi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.mqi.set(t, e));
  }
  vqi(t, o) {
    var e = this.dqi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.dqi.set(t, e));
  }
  IfRoleMotionCanUnlock(t) {
    t = this.mqi.get(t);
    return !!t && 0 < t.size;
  }
}
exports.MotionModel = MotionModel;
//# sourceMappingURL=MotionModel.js.map
