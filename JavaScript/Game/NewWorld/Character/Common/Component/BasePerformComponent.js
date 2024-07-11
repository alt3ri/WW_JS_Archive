"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, i, e, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(i, e, n) : o(i, e)) || n);
    return 3 < h && n && Object.defineProperty(i, e, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayingMontageInfo =
    exports.PlayMontageConfig =
    exports.BasePerformComponent =
      void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  SECOND_TO_MILLISECOND = 1e3;
let BasePerformComponent = class BasePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.AnimComp = void 0),
      (this.sFr = 0),
      (this.aFr = new Map()),
      (this.hFr = new Set()),
      (this.InLevelAiControl = () => !0),
      (this.lFr = (e) => {
        const s = (t, i) => {
          this.RemoveOnMontageEnded(s), this.RemoveMontageInfo(e);
        };
        e.BodyMontage?.IsValid() &&
        this.AnimComp.MainAnimInstance.Montage_IsPlaying(e.BodyMontage) &&
        !this.GetCurrentSection().op_Equality(
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        )
          ? (this.AddOnMontageEnded(s), this.Stop(!0, e.BodyMontage))
          : (this.ForceStop(0.5, e.BodyMontage), this.RemoveMontageInfo(e));
      });
  }
  _Fr() {
    return ++this.sFr;
  }
  IsPlayingMontage(t) {
    return this.aFr.has(t);
  }
  GetMontageController() {
    return this;
  }
  LoadAndPlayMontageById(t, i, e = void 0, s = void 0, o = void 0) {
    let h = void 0;
    return (h = t.IsAbp
      ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(t.MontageId)
      : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(t.MontageId))
      ? this.LoadAndPlayMontage(h.ActionMontage, i, e, s, o)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            43,
            "当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格",
            ["EntityId", this.AnimComp.Actor.EntityId],
            ["MontageId", t.MontageId],
            ["IsABP", t.IsAbp],
          ),
        -1);
  }
  LoadAndPlayMontage(t, i, e = void 0, s = void 0, o = void 0) {
    if (this.hFr.has(t))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "NPC",
            43,
            "当前正在播放该蒙太奇动画,应先停止当前动画",
            ["EntityId", this.AnimComp.Actor.EntityId],
            ["无限循环", i.IsInfiniteLoop],
            ["剩余时间", i.PlayMontageTime],
            ["MontagePath", t],
          ),
        -1
      );
    var h = this._Fr();
    const n = new PlayingMontageInfo(h, t, i, this, e, s, o);
    return (
      this.aFr.set(h, n),
      this.hFr.add(t),
      this.LoadAsync(t, (t, i) => {
        t?.IsValid() &&
          n.CheckPlayCondition() &&
          ((t = (n.BodyMontage = t).SequenceLength * SECOND_TO_MILLISECOND),
          0 === n.MontageConfig.PlayMontageTime
            ? n.MontageConfig.CalculatePlayTime(t)
            : (n.MontageConfig.OncePlayTime = t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              43,
              "开始播放蒙太奇动画",
              ["EntityId", this.AnimComp.Actor.EntityId],
              ["无限循环", n.MontageConfig.IsInfiniteLoop],
              ["剩余时间", n.MontageConfig.PlayMontageTime],
              ["MontagePath", n.MontagePath],
            ),
          n.PlayMontageLoop(this.lFr));
      }) !== ResourceSystem_1.ResourceSystem.InvalidId
        ? h
        : -1
    );
  }
  ClearAndStopMontage(t, i = 0) {
    this.aFr.has(t) &&
      (t = this.aFr.get(t)) &&
      (t.BodyMontage?.IsValid() && this.ForceStop(i, t.BodyMontage),
      this.RemoveMontageInfo(t));
  }
  RemoveMontageInfo(t) {
    t &&
      (t.OnClearInfo(), this.hFr.delete(t.MontagePath), this.aFr.delete(t.Uid));
  }
  LoadAsync(t, i) {
    return this.AnimComp.LoadAsync(t, i);
  }
  Play(t, i) {
    this.AnimComp.Play(t, i);
  }
  PlayOnce(t, i) {
    this.AnimComp.PlayOnce(t, i);
  }
  PlayFromLoop(t, i) {
    this.AnimComp.PlayFromLoop(t, i);
  }
  PlayFromEnd(t, i) {
    this.AnimComp.PlayFromEnd(t, i);
  }
  Stop(t = !1, i) {
    this.AnimComp.Stop(t, i);
  }
  StopMontage(t = 0) {
    this.AnimComp.StopMontage(t);
  }
  ForceStop(t, i) {
    this.AnimComp.ForceStop(t, i);
  }
  ForceStopWithBlendOut(t, i) {
    this.AnimComp.ForceStopWithBlendOut(t, i);
  }
  AddOnMontageEnded(t) {
    this.AnimComp.AddOnMontageEnded(t);
  }
  RemoveOnMontageEnded(t) {
    this.AnimComp.RemoveOnMontageEnded(t);
  }
  ClearOnMontageEnded() {
    this.AnimComp.ClearOnMontageEnded();
  }
  GetCurrentSection() {
    return this.AnimComp.GetCurrentSection();
  }
  PlayMontageByName(t, i) {
    return this.AnimComp.PlayMontageByName(t, i);
  }
  PlayMontageById(t, i) {
    return this.AnimComp.PlayMontageById(t, i);
  }
};
(BasePerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(37)],
  BasePerformComponent,
)),
  (exports.BasePerformComponent = BasePerformComponent);
class PlayMontageConfig {
  constructor(t = 0, i = 0, e = !1, s = !1) {
    (this.PlayMontageTime = 0),
      (this.OncePlayTime = 0),
      (this.IsInfiniteLoop = !1),
      (this.IsPlayLoop = !1),
      (this.NTe = 0),
      (this.OTe = 0),
      (this.OTe = t),
      (this.NTe = i),
      (this.IsPlayLoop = e || 0 !== this.NTe),
      (this.IsInfiniteLoop = s || -1 === this.NTe || -1 === this.OTe);
  }
  CalculatePlayTime(t) {
    (this.OncePlayTime = t),
      (this.PlayMontageTime =
        this.NTe && 0 < this.NTe
          ? this.NTe * SECOND_TO_MILLISECOND
          : this.OTe && 0 < this.OTe
            ? this.OTe * t
            : t),
      this.IsInfiniteLoop ||
        (this.PlayMontageTime < TimerSystem_1.MIN_TIME &&
          (this.PlayMontageTime = Math.max(t, TimerSystem_1.MIN_TIME)),
        this.PlayMontageTime > TimerSystem_1.MAX_TIME &&
          (this.IsInfiniteLoop = !0));
  }
}
exports.PlayMontageConfig = PlayMontageConfig;
class PlayingMontageInfo {
  constructor(t, i, e, s, o = void 0, h = void 0, n = void 0) {
    (this.Uid = 0),
      (this.MontagePath = ""),
      (this.MontageConfig = void 0),
      (this.BodyMontage = void 0),
      (this.TimerHandle = void 0),
      (this.R$o = void 0),
      (this.U$o = void 0),
      (this.A$o = void 0),
      (this.P$o = void 0),
      (this.Uid = t),
      (this.MontagePath = i),
      (this.MontageConfig = e),
      (this.U$o = o),
      (this.A$o = h),
      (this.R$o = n),
      (this.P$o = s);
  }
  CheckPlayCondition() {
    return !this.R$o || this.R$o();
  }
  OnClearInfo() {
    this.A$o && this.A$o(),
      this.TimerHandle &&
        TimerSystem_1.TimerSystem.Has(this.TimerHandle) &&
        (TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
        (this.TimerHandle = void 0)),
      (this.MontageConfig = void 0),
      (this.U$o = void 0),
      (this.A$o = void 0),
      (this.R$o = void 0);
  }
  PlayMontageLoop(t) {
    this.U$o && this.U$o(), this.x$o(t);
  }
  x$o(i) {
    if (this.MontageConfig.IsInfiniteLoop && this.MontageConfig.IsPlayLoop)
      this.P$o.Play(this.BodyMontage);
    else {
      let t = 0;
      this.MontageConfig.IsPlayLoop
        ? ((t = this.MontageConfig.PlayMontageTime),
          this.P$o.Play(this.BodyMontage))
        : ((t = this.MontageConfig.OncePlayTime),
          this.P$o.PlayOnce(this.BodyMontage)),
        (this.MontageConfig.PlayMontageTime =
          this.MontageConfig.PlayMontageTime - t),
        !this.MontageConfig.IsInfiniteLoop &&
        this.MontageConfig.PlayMontageTime <= TimerSystem_1.MIN_TIME
          ? (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
              (this.TimerHandle = void 0), i(this);
            }, t))
          : (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
              (this.TimerHandle = void 0), this.PlayMontageLoop(i);
            }, t));
    }
  }
}
exports.PlayingMontageInfo = PlayingMontageInfo;
//# sourceMappingURL=BasePerformComponent.js.map
