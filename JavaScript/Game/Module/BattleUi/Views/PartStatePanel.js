"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PartStatePanel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PartState_1 = require("./PartState");
class PartStatePanel {
  constructor() {
    (this.Xut = new Map()),
      (this.$ut = (t, e, r) => {
        var i = EntitySystem_1.EntitySystem.Get(t);
        if (FNameUtil_1.FNameUtil.IsNothing(e))
          i &&
            (r
              ? this.ActivatePartStateByRole(i)
              : this.DestroyPartStateFromRole(i));
        else if (i) {
          var s,
            a = i.GetComponent(58).Parts;
          if (!(a.length <= 0))
            for (const o of a)
              o.BoneName.op_Equality(e) &&
                (r
                  ? this.ActivatePartState(i, o)
                  : ((s = o.Index), this.DestroyPartState(t, s)));
        }
      });
  }
  InitializePartStatePanel() {
    this.Ore();
  }
  ResetPartStatePanel() {
    this.DestroyAllParStates(), this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSetPartStateVisible,
      this.$ut,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSetPartStateVisible,
      this.$ut,
    );
  }
  OnCreateEntity(t) {
    if (t) {
      var e = t.GetComponent(58);
      if (e) {
        e = e.Parts;
        if (e && 0 !== e.length) {
          var r,
            i = t.GetComponent(1).Owner.Mesh;
          for (const s of e)
            s.IsPartStateVisible &&
              ((r = s.PartSocketName),
              i.DoesSocketExist(r)
                ? this.ActivatePartState(t, s)
                : Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Battle",
                    8,
                    "[BattleView]激活部位血条时找不到部位插槽:",
                    ["SocketName", r],
                  ));
        }
      }
    }
  }
  ActivatePartStateByRole(t) {
    if (t) {
      var e = t.GetComponent(58).Parts;
      if (0 !== e.length) for (const r of e) this.ActivatePartState(t, r);
    }
  }
  ActivatePartState(t, e) {
    var r = this.GetPartState(t.Id, e.Index);
    r ? r.InitializePartState(t, e) : this.Yut(t, e);
  }
  DestroyAllParStates() {
    for (const t of this.Xut.values()) for (const e of t.values()) e.Destroy();
    this.Xut.clear();
  }
  DestroyPartStateFromRole(t) {
    var t = t.Id,
      e = this.GetAllPartStates(t);
    if (e) {
      for (const r of e.values()) r.Destroy();
      this.Xut.get(t).clear();
    }
  }
  DestroyPartState(t, e) {
    var r = this.GetPartState(t, e);
    r && (r.Destroy(), (r = this.Xut.get(t))) && r.delete(e);
  }
  Tick(t) {
    for (const e of this.Xut.values()) for (const r of e.values()) r.Tick(t);
  }
  Yut(t, e) {
    var r = t.Id,
      t = new PartState_1.PartState(t, e);
    let i = this.Xut.get(r);
    return (
      i
        ? i.set(e.Index, t)
        : ((i = new Map()).set(e.Index, t), this.Xut.set(r, i)),
      t
    );
  }
  GetPartState(t, e) {
    t = this.Xut.get(t);
    if (t) return t.get(e);
  }
  GetAllPartStates(t) {
    return this.Xut.get(t);
  }
}
(exports.PartStatePanel = PartStatePanel).aYe = void 0;
//# sourceMappingURL=PartStatePanel.js.map
