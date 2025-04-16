"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBase = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  GameplayCueController_1 = require("./Controller/GameplayCueController");
class GameplayCueBase {
  constructor(t, e, i, s, h, a, o, r, l) {
    (this.tQo = t),
      (this.CueConfig = e),
      (this.EntityHandle = i),
      (this.ActorInternal = s),
      (this.CueComp = h),
      (this.IsInstant = a),
      (this.BeginCallback = o),
      (this.EndCallback = r),
      (this.Instigator = l),
      (this.BuffId = void 0),
      (this.ActiveHandleId = 0),
      (this.IsActive = !1);
  }
  get Handle() {
    return this.tQo;
  }
  OnInit() {}
  OnTick(t) {}
  OnCreate() {}
  OnDestroy() {}
  OnEnable() {}
  OnDisable() {}
  OnChangeRole(t) {
    (this.EntityHandle = t),
      (this.ActorInternal = t.Entity.GetComponent(3).Actor),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          28,
          "Cue特效换人",
          ["CueType", this.CueConfig.CueType],
          ["CueId", this.CueConfig.Id],
          ["CueHandleId", this.Handle],
          ["BuffId", this.BuffId],
          ["BuffHandleID", this.ActiveHandleId],
          ["EntityId", this.EntityHandle.Id],
          ["Name", this.ActorInternal.GetName()],
        );
  }
  static Spawn(t) {
    var e = new this(
      t.Instant
        ? GameplayCueController_1.INSTANT_CUE_HANDLE
        : GameplayCueController_1.GameplayCueController.GenerateHandle(),
      t.CueConfig,
      t.EntityHandle,
      t.EntityHandle.Entity.GetComponent(3).Actor,
      t.CueComp,
      t.Instant,
      t.BeginCallback,
      t.EndCallback,
      t.Instigator,
    );
    return (
      t.Buff && ((e.ActiveHandleId = t.Buff.Handle), (e.BuffId = t.Buff.Id)),
      e.OnInit(),
      (t.Buff && !t.Buff.IsActive()) || e.Create(),
      e
    );
  }
  Create(t) {
    t?.Valid &&
      ((this.EntityHandle = t),
      (this.ActorInternal = t.Entity.GetComponent(3).Actor)),
      this.IsActive ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            28,
            "Cue特效开始",
            ["CueType", this.CueConfig.CueType],
            ["CueId", this.CueConfig.Id],
            ["CueHandleId", this.Handle],
            ["BuffId", this.BuffId],
            ["BuffHandleID", this.ActiveHandleId],
            ["EntityId", this.EntityHandle.Id],
            ["Name", this.ActorInternal.GetName()],
          ),
        (this.IsActive = !0),
        this.ith(),
        this.OnCreate());
  }
  Destroy() {
    this.IsActive &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          28,
          "Cue特效结束",
          ["CueType", this.CueConfig.CueType],
          ["CueId", this.CueConfig.Id],
          ["CueHandleId", this.Handle],
          ["BuffId", this.BuffId],
          ["BuffHandleID", this.ActiveHandleId],
          ["EntityId", this.EntityHandle.Id],
          ["Name", this.ActorInternal.GetName()],
        ),
      (this.IsActive = !1),
      this.CueComp.CueContainer.delete(this.Handle),
      this.OnDestroy());
  }
  Tick(t) {
    this.IsActive && this.OnTick(t);
  }
  ith() {
    this.Handle !== GameplayCueController_1.INSTANT_CUE_HANDLE &&
      this.CueComp.CueContainer.set(this.Handle, this);
  }
  GetPath() {
    let t = void 0;
    var e = this.EntityHandle.Entity.GetComponent(3);
    return (
      (t = e ? e.GetReplaceEffect(this.CueConfig.Path) : t) ||
      this.CueConfig.Path
    );
  }
}
exports.GameplayCueBase = GameplayCueBase;
//# sourceMappingURL=GameplayCueBase.js.map
