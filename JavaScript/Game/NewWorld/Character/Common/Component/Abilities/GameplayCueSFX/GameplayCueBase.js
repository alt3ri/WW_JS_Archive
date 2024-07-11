"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBase = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log");
class GameplayCueBase {
  constructor(t, i, s, e, h, a) {
    (this.Entity = t),
      (this.CueConfig = i),
      (this.ActorInternal = s),
      (this.CueComp = e),
      (this.BeginCallback = h),
      (this.EndCallback = a),
      (this.IsActive = !1),
      (this.BuffId = void 0),
      (this.IsInstant = !1),
      (this.ActiveHandleId = 0);
  }
  OnInit() {}
  OnTick(t) {}
  OnCreate() {}
  OnDestroy() {}
  OnEnable() {}
  OnDisable() {}
  OnChangeTimeDilation(t) {}
  static Spawn(t) {
    const i = new this(
      t.Entity,
      t.CueConfig,
      t.Actor,
      t.CueComp,
      t.BeginCallback,
      t.EndCallback,
    );
    return (
      t.Buff
        ? ((i.ActiveHandleId = t.Buff.Handle),
          (i.IsInstant = t.Buff.IsInstantBuff()),
          (i.BuffId = t.Buff.Id))
        : (i.IsInstant = !0),
      i.OnInit(),
      (i.IsInstant || t.Buff.IsActive()) && i.Create(),
      i
    );
  }
  Create() {
    this.IsActive ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          29,
          "Buff特效开始",
          ["HandleID", this.ActiveHandleId],
          ["BuffId", this.BuffId],
          ["CueId", this.CueConfig.Id],
          ["EntityId", this.Entity.Id],
        ),
      (this.IsActive = !0),
      this.OnCreate());
  }
  Destroy() {
    this.IsActive &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          29,
          "Buff特效结束",
          ["HandleID", this.ActiveHandleId],
          ["BuffId", this.BuffId],
          ["CueId", this.CueConfig.Id],
          ["EntityId", this.Entity.Id],
        ),
      (this.IsActive = !1),
      this.OnDestroy());
  }
  Tick(t) {
    this.IsActive && this.OnTick(t);
  }
  Enable() {
    this.OnEnable();
  }
  Disable() {
    this.OnDisable();
  }
  ChangeTimeDilation(t) {
    this.OnChangeTimeDilation(t);
  }
}
exports.GameplayCueBase = GameplayCueBase;
// # sourceMappingURL=GameplayCueBase.js.map
