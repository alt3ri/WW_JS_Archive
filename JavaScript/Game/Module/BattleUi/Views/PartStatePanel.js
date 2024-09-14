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
    (this.smt = new Map()),
      (this.amt = (t, e, a) => {
        var r = EntitySystem_1.EntitySystem.Get(t);
        if (FNameUtil_1.FNameUtil.IsNothing(e))
          r &&
            (a
              ? this.ActivatePartStateByRole(r)
              : this.DestroyPartStateFromRole(r));
        else if (r) {
          var i,
            s = r.GetComponent(61).Parts;
          if (!(s.length <= 0))
            for (const o of s)
              o.BoneName.op_Equality(e) &&
                (a
                  ? this.ActivatePartState(r, o)
                  : ((i = o.Index), this.DestroyPartState(t, i)));
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
      this.amt,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSetPartStateVisible,
      this.amt,
    );
  }
  OnCreateEntity(t) {
    if (t) {
      var e = t.GetComponent(61);
      if (e) {
        e = e.Parts;
        if (e && 0 !== e.length) {
          var a,
            r = t.GetComponent(1).Owner.Mesh;
          for (const i of e)
            i.IsPartStateVisible &&
              ((a = i.PartSocketName),
              r.DoesSocketExist(a)
                ? this.ActivatePartState(t, i)
                : Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Battle",
                    8,
                    "[BattleView]激活部位血条时找不到部位插槽:",
                    ["SocketName", a],
                  ));
        }
      }
    }
  }
  ActivatePartStateByRole(t) {
    if (t) {
      var e = t.GetComponent(61).Parts;
      if (0 !== e.length) for (const a of e) this.ActivatePartState(t, a);
    }
  }
  ActivatePartState(t, e) {
    var a = this.GetPartState(t.Id, e.Index);
    a ? a.InitializePartState(t, e) : this.hmt(t, e);
  }
  DestroyAllParStates() {
    for (const t of this.smt.values()) for (const e of t.values()) e.Destroy();
    this.smt.clear();
  }
  DestroyPartStateFromRole(t) {
    var t = t.Id,
      e = this.GetAllPartStates(t);
    if (e) {
      for (const a of e.values()) a.Destroy();
      this.smt.get(t).clear();
    }
  }
  DestroyPartState(t, e) {
    var a = this.GetPartState(t, e);
    a && (a.Destroy(), (a = this.smt.get(t))) && a.delete(e);
  }
  Tick(t) {
    PartStatePanel.vJe.Start();
    for (const e of this.smt.values()) for (const a of e.values()) a.Tick(t);
    PartStatePanel.vJe.Stop();
  }
  hmt(t, e) {
    var a = t.Id,
      t = new PartState_1.PartState(t, e);
    let r = this.smt.get(a);
    return (
      r
        ? r.set(e.Index, t)
        : ((r = new Map()).set(e.Index, t), this.smt.set(a, r)),
      t
    );
  }
  GetPartState(t, e) {
    t = this.smt.get(t);
    if (t) return t.get(e);
  }
  GetAllPartStates(t) {
    return this.smt.get(t);
  }
}
(exports.PartStatePanel = PartStatePanel).vJe = Stats_1.Stat.Create(
  "[BattleView]PartStatePanelTick",
);
//# sourceMappingURL=PartStatePanel.js.map
