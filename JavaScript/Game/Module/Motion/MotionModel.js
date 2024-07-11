"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MotionModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
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
    const o = t.LLs;
    for (const i of Object.keys(o)) {
      const e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  OnMotionFinishCondition(t) {
    const o = t.LLs;
    for (const i of Object.keys(o)) {
      const e = Number(i);
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
        const i = t.get(o);
        if (i) {
          const n = i.length;
          for (let t = 0; t < n; t++) if (i[t] === e) return !0;
        }
      }
    }
    return !1;
  }
  UpdateCondition(t, o) {
    const e = this.Cbi.get(t) ?? new Map();
    const i = o.wLs;
    for (const M of Object.keys(i)) {
      const n = Number(M);
      const r = i[n].ULs;
      const s = e.get(n) ?? new Map();
      for (const _ of Object.keys(r)) {
        const h = Number(_);
        const a = r[h].PLs;
        const v = s.get(h) ?? [];
        const l = a.length;
        for (let t = 0; t < l; t++) {
          const c = a[t];
          v.push(c);
        }
        s.set(h, v);
      }
      e.set(n, s);
    }
    this.Cbi.set(t, e);
  }
  gbi(t, o) {
    var e = this.cbi.get(t);
    var e = (e && e.delete(o), this.dbi.get(t));
    var e = (e && e.delete(o), this.mbi.get(t));
    e && e.delete(o);
  }
  fbi(t, o) {
    let e = this.cbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.cbi.set(t, e));
  }
  pbi(t, o) {
    let e = this.mbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.mbi.set(t, e));
  }
  vbi(t, o) {
    let e = this.dbi.get(t);
    e ? e.add(o) : ((e = new Set()).add(o), this.dbi.set(t, e));
  }
  IfRoleMotionCanUnlock(t) {
    t = this.mbi.get(t);
    return !!t && t.size > 0;
  }
}
exports.MotionModel = MotionModel;
// # sourceMappingURL=MotionModel.js.map
