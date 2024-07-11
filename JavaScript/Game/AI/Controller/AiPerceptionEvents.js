"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiPerceptionEvents = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController");
class AiPerceptionEvents {
  constructor(t) {
    (this.Bte = t),
      (this.Xoe = new Array()),
      (this.$oe = new Array()),
      (this.Yoe = new Array()),
      (this.Joe = new Array()),
      (this.zoe = new Array()),
      (this.Zoe = new Array()),
      (this.ere = new Array()),
      (this.tre = UE.NewArray(UE.Actor)),
      (this.ire = UE.NewArray(UE.Actor)),
      (this.ore = UE.NewArray(UE.BuiltinInt)),
      (this.rre = UE.NewArray(UE.Actor)),
      (this.nre = UE.NewArray(UE.Actor)),
      (this.sre = UE.NewArray(UE.BuiltinInt)),
      (this.are = UE.NewArray(UE.Actor)),
      (this.hre = new Array()),
      (this.lre = new Array()),
      (this._re = new Array()),
      (this.ure = !0),
      (this.cre = !0),
      (this.mre = !0),
      (this.dre = void 0),
      (this.Cre = 0),
      (this.gre = new Set()),
      (this.uie = (t) => {
        t = t.GetComponent(1);
        t?.Valid &&
          Vector_1.Vector.DistSquared(
            this.Bte.CharActorComp.ActorLocationProxy,
            t.ActorLocationProxy,
          ) < this.Cre &&
          !this.gre.has(t.Entity.Id) &&
          (this.gre.add(t.Entity.Id), this.dre.Callback.Broadcast(t.Owner, !0));
      });
  }
  Clear(t = !1) {
    this.Xoe.splice(0, this.Xoe.length),
      this.$oe.splice(0, this.$oe.length),
      this.Yoe.splice(0, this.Yoe.length),
      this.Joe.splice(0, this.Joe.length),
      this.zoe.splice(0, this.zoe.length),
      this.Zoe.splice(0, this.Zoe.length),
      this.ere.splice(0, this.ere.length),
      this.tre.Empty(),
      this.ire.Empty(),
      this.ore.Empty(),
      this.rre.Empty(),
      this.nre.Empty(),
      this.sre.Empty(),
      this.are.Empty(),
      t &&
        (this.hre.splice(0, this.hre.length),
        this.lre.splice(0, this.lre.length),
        this._re.splice(0, this._re.length),
        this.dre) &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemDestroy,
          this.uie,
        ),
        (this.dre = void 0),
        this.gre.clear());
  }
  TickPerception() {
    0 !== this.lre.length && this.fre();
  }
  TickHate() {
    0 < this._re.length && this.pre(), 0 < this.hre.length && this.vre();
  }
  pre() {
    for (const i of this.Xoe) {
      var t = this.ere.indexOf(i);
      -1 !== t && this.ere.slice(t, 1);
    }
    if (0 < this.ere.length) {
      this.Mre("超出距离被伤害没添加仇恨事件广播", this.ere, void 0),
        this.Sre(this.ere, this.are);
      for (const s of this._re)
        s.Callback.Broadcast(this.are, void 0, void 0, 0);
      this.ere.splice(0, this.ere.length), this.are.Empty();
    }
  }
  vre() {
    var t = 0 < this.Xoe.length,
      i = 0 < this.$oe.length;
    if (t || i) {
      var s = this.Bte.AiHateList.GetHatredMap().size;
      if (t)
        if (i) {
          this.Mre("仇恨广播", this.Xoe, this.$oe),
            this.Sre(this.Xoe, this.tre),
            this.Sre(this.$oe, this.ire),
            this.Ere(this.Yoe, this.ore),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "CallHate Other", [
                "Count",
                this.hre.length,
              ]);
          for (const h of this.hre)
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("AI", 6, "Before CallHate Callback"),
              h.Callback.Broadcast(this.tre, this.ire, this.ore, s),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("AI", 6, "After CallHate Callback");
          this.Xoe.splice(0, this.Xoe.length),
            this.$oe.splice(0, this.$oe.length),
            this.tre.Empty(),
            this.ire.Empty(),
            this.Yoe.splice(0, this.Yoe.length),
            this.ore.Empty();
        } else {
          this.Mre("仇恨广播", this.Xoe, void 0),
            this.Sre(this.Xoe, this.tre),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "CallHate no remove", [
                "Count",
                this.hre.length,
              ]);
          for (const e of this.hre)
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("AI", 6, "Before CallHate Callback"),
              e.Callback.Broadcast(this.tre, void 0, void 0, s),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("AI", 6, "After CallHate Callback");
          this.Xoe.splice(0, this.Xoe.length), this.tre.Empty();
        }
      else {
        this.Mre("仇恨广播", void 0, this.$oe),
          this.Sre(this.$oe, this.ire),
          this.Ere(this.Yoe, this.ore),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 6, "CallHate no add", [
              "Count",
              this.hre.length,
            ]);
        for (const r of this.hre)
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("AI", 6, "Before Hatred Callback"),
            r.Callback.Broadcast(void 0, this.ire, this.ore, s),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("AI", 6, "After Hatred Callback");
        this.$oe.splice(0, this.$oe.length),
          this.ire.Empty(),
          this.Yoe.splice(0, this.Yoe.length),
          this.ore.Empty();
      }
    }
  }
  fre() {
    var t = 0 < this.Joe.length,
      i = 0 < this.zoe.length;
    if (t || i) {
      var s = this.Bte.AiPerception.AllEnemies.size;
      if (t)
        if (i) {
          this.Mre("感知广播", this.Joe, this.zoe),
            this.Sre(this.Joe, this.rre),
            this.Sre(this.zoe, this.nre),
            this.Ere(this.Zoe, this.sre);
          for (const h of this.lre)
            h.Callback.Broadcast(this.rre, this.nre, this.sre, s);
          this.Joe.splice(0, this.Joe.length),
            this.zoe.splice(0, this.zoe.length),
            this.rre.Empty(),
            this.nre.Empty(),
            this.Zoe.splice(0, this.Zoe.length),
            this.sre.Empty();
        } else {
          this.Mre("感知广播", this.Joe, void 0), this.Sre(this.Joe, this.rre);
          for (const e of this.lre)
            e.Callback.Broadcast(this.rre, void 0, void 0, s);
          this.Joe.splice(0, this.Joe.length), this.rre.Empty();
        }
      else {
        this.Mre("感知广播", void 0, this.zoe),
          this.Sre(this.zoe, this.nre),
          this.Ere(this.Zoe, this.sre);
        for (const r of this.lre)
          r.Callback.Broadcast(void 0, this.nre, this.sre, s);
        this.zoe.splice(0, this.zoe.length),
          this.nre.Empty(),
          this.Zoe.splice(0, this.Zoe.length),
          this.sre.Empty();
      }
    }
  }
  Sre(t, i) {
    for (const h of t) {
      var s = EntitySystem_1.EntitySystem.Get(h);
      s && s.Active && s.Valid && (s = s.GetComponent(1)?.Owner) && i.Add(s);
    }
    t.splice(0, t.length);
  }
  Ere(t, i) {
    for (const s of t) i.Add(s);
  }
  AddAiHateEvent(t) {
    if (!this.hre.includes(t)) {
      var i;
      if (this.Bte?.AiHateList)
        for ([i] of this.Bte?.AiHateList.GetHatredMap())
          this.Bte?.AiPerceptionEvents.CollectAiHateEventById(!0, i);
      this.hre.push(t);
    }
  }
  yre(t, i, s, h) {
    if (t && s) {
      t = h.indexOf(i.Id);
      -1 !== t
        ? (h.slice(t, t + 1), s.push(i.Id))
        : s.includes(i.Id) || s.push(i.Id);
    } else {
      if (s) {
        t = s.indexOf(i.Id);
        if (-1 !== t) return s.slice(t, t + 1), void h.push(i.Id);
      }
      h.includes(i.Id) || h.push(i.Id);
    }
  }
  Ire(t, i, s, h) {
    if (t && s) {
      t = h.indexOf(i);
      -1 !== t ? (h.slice(t, t + 1), s.push(i)) : s.includes(i) || s.push(i);
    } else {
      if (s) {
        t = s.indexOf(i);
        if (-1 !== t) return s.slice(t, t + 1), void h.push(i);
      }
      h.includes(i) || h.push(i);
    }
  }
  CollectAiHateEvent(t, i) {
    this.yre(t, i, this.Xoe, this.$oe);
  }
  CollectAiHateEventById(t, i) {
    this.Ire(t, i, this.Xoe, this.Yoe);
  }
  AddAiHateOutRangeEvent(t) {
    this._re.includes(t) || this._re.push(t);
  }
  CollectAiHateOutRangeEvent(t) {
    this.ere.includes(t.Id) || this.ere.push(t.Id);
  }
  AddAiPerceptionEvent(t, i, s, h) {
    if (!this.lre.includes(t)) {
      if (
        ((this.ure = i), (this.cre = s), (this.mre = h), this.Bte?.AiPerception)
      )
        for (const e of this.Bte?.AiPerception.AllEnemies)
          this.Bte?.AiPerceptionEvents.CollectAiPerceptionEventById(!0, e, 2);
      this.lre.push(t);
    }
  }
  SetPerceptionEventState(t, i, s) {
    (this.ure = t), (this.cre = i), (this.mre = s);
  }
  CollectAiPerceptionEventByActorComp(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) break;
        return;
      case 2:
        if (this.cre) break;
        return;
      default:
        if (this.mre) break;
        return;
    }
    this.yre(t, i.Entity, this.Joe, this.zoe);
  }
  CollectAiPerceptionEventById(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) break;
        return;
      case 2:
        if (this.cre) break;
        return;
      default:
        if (this.mre) break;
        return;
    }
    this.Ire(t, i, this.Joe, this.zoe);
  }
  CollectAiRemovePerceptionEventByEntityId(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) break;
        return;
      case 2:
        if (this.cre) break;
        return;
      default:
        if (this.mre) break;
        return;
    }
    this.Ire(t, i, void 0, this.Zoe);
  }
  AddSceneItemDestroyEvent(t, i) {
    this.dre ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemDestroy,
        this.uie,
      ),
      (this.dre = i),
      (this.Cre = t * t);
  }
  RemoveSceneItemDestroyEvent(t) {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSceneItemDestroy,
      this.uie,
    ),
      (this.dre = void 0),
      this.gre.clear();
  }
  ForceTriggerSceneItemDestroyEvent(t) {
    this.dre?.IsValid() && this.dre.Callback.Broadcast(t, !0);
  }
  OnSenseSceneItem(t) {
    var i;
    this.dre &&
      !this.gre.has(t.Entity.Id) &&
      (i = t.Entity.GetComponent(90))?.Valid &&
      i.IsDestroyed &&
      (this.gre.add(t.Entity.Id), this.dre.Callback.Broadcast(t.Owner, !0));
  }
  Mre(t, i, s) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Ai",
      this.Bte.CharActorComp.Entity,
      t,
      ["addIds", i],
      ["removeIds:", s],
    );
  }
}
exports.AiPerceptionEvents = AiPerceptionEvents;
//# sourceMappingURL=AiPerceptionEvents.js.map
