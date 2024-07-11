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
      (this.cbi = new Map()),
      (this.mbi = new Map()),
      (this.dbi = new Map()),
      (this.Cbi = new Map());
  }
  OnMotionUnlock(t, o) {
    this.gbi(t, o),
      this.fbi(t, o),
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
    this.gbi(t, o), this.pbi(t, o);
  }
  OnRoleMotionActive(o) {
    o.GLs.qLs.forEach((t) => {
      this.gbi(o.GLs.l3n, t.Ekn),
        t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
          ? this.vbi(o.GLs.l3n, t.Ekn)
          : t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked
            ? this.fbi(o.GLs.l3n, t.Ekn)
            : t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock &&
              this.pbi(o.GLs.l3n, t.Ekn);
    });
  }
  OnGetAllRoleMotionInfo(t) {
    this.cbi.clear(),
      this.dbi.clear(),
      this.mbi.clear(),
      t.OLs.forEach((o) => {
        o.qLs.forEach((t) => {
          this.gbi(o.l3n, t.Ekn),
            t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
              ? this.vbi(o.l3n, t.Ekn)
              : t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked
                ? this.fbi(o.l3n, t.Ekn)
                : t.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock &&
                  this.pbi(o.l3n, t.Ekn);
        });
      });
    var o = t.LLs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  OnMotionFinishCondition(t) {
    var o = t.LLs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  GetRoleMotionState(t, o) {
    let e = this.cbi.get(t);
    return e && e.has(o)
      ? 2
      : (!(e = this.dbi.get(t)) || !e.has(o)) &&
          (e = this.mbi.get(t)) &&
          e.has(o)
        ? 1
        : 0;
  }
  IsCondtionFinish(t, o, e) {
    t = this.Cbi.get(t);
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
    var e = this.Cbi.get(t) ?? new Map(),
      i = o.wLs;
    for (const M of Object.keys(i)) {
      var n = Number(M),
        r = i[n].ULs,
        s = e.get(n) ?? new Map();
      for (const _ of Object.keys(r)) {
        var h = Number(_),
          a = r[h].PLs,
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
    this.Cbi.set(t, e);
  }
  gbi(t, o) {
    var e = this.cbi.get(t),
      e = (e && e.delete(o), this.dbi.get(t)),
      e = (e && e.delete(o), this.mbi.get(t));
    e && e.delete(o);
  }
  fbi(t, o) {
    var e = this.cbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.cbi.set(t, e));
  }
  pbi(t, o) {
    var e = this.mbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.mbi.set(t, e));
  }
  vbi(t, o) {
    var e = this.dbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.dbi.set(t, e));
  }
  IfRoleMotionCanUnlock(t) {
    t = this.mbi.get(t);
    return !!t && 0 < t.size;
  }
}
exports.MotionModel = MotionModel;
//# sourceMappingURL=MotionModel.js.map
