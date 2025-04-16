"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectLifeTime = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  TickSystem_1 = require("../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  NEAR_ZERO = 0.001,
  CHECK_CAN_STOP_INTERVAL = 1e3;
class EffectLifeTime {
  constructor(i) {
    (this.Rge = i),
      (this.DefaultPassTime = 0),
      (this.PassTime = 0),
      (this.TotalPassTime = 0),
      (this.StartTime = -1),
      (this.LoopTime = 0),
      (this.EndTime = 0),
      (this.LoopTimeStamp = 0),
      (this.LifeTimeStamp = 0),
      (this.Uge = !1),
      (this.Age = !1),
      (this.gW = void 0),
      (this.Pge = void 0),
      (this.xge = void 0),
      (this.wge = !1),
      (this.Bge = void 0),
      (this.bge = 1),
      (this.qge = void 0),
      (this.Gge = () => {
        (this.qge = void 0),
          this.Rge?.GetHandle()?.SetTimeScale(1),
          this.SetTimeScale(1),
          EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderEffect",
              36,
              "特效框架：特效设置TimeScale为极小值，没有及时置回，造成泄漏",
              ["句柄Id", this.Rge?.GetHandle()?.Id],
              ["Path", this.Rge?.GetHandle()?.Path],
              ["CreateReason", this.Rge?.GetHandle()?.CreateReason],
            );
      }),
      (this.Nge = () => {
        this.Pge?.Start();
        var i,
          t = this.Rge;
        (this.Bge = void 0),
          t.GetHandle().IsRoot()
            ? t.CanStop()
              ? (Info_1.Info.IsGameRunning() &&
                  ((i = t.GetHandle().GetSureEffectActor()) &&
                    !t.GetHandle().IsExternalActor &&
                    (i.K2_DetachFromActor(),
                    t.GetHandle().SetHidden(!0, "EffectLifeTime.PlayFinished")),
                  this.Rge.GetHandle().UnregisterTick()),
                this.Rge.GetHandle()?.OnPlayFinished())
              : (this.Bge = TimerSystem_1.TimerSystem.Delay(
                  this.Nge,
                  CHECK_CAN_STOP_INTERVAL,
                ))
            : t.GetHandle().Stop("[EffectLifeTime.PlayFinished] 播放完成", !0),
          this.Pge?.Stop();
      }),
      Stats_1.Stat.Enable &&
        !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat &&
        ((this.gW = Stats_1.Stat.Create("[EffectLifeTime.Tick]")),
        (this.Pge = Stats_1.Stat.Create("[EffectLifeTime.PlayFinishStat]")),
        (this.xge = Stats_1.Stat.Create("[EffectLifeTime.SeekTo]")));
  }
  get IsLoop() {
    return this.Uge;
  }
  GetLifeTime() {
    return this.LifeTimeStamp;
  }
  get GetPassTime() {
    return this.PassTime;
  }
  get GetEndTime() {
    return this.EndTime;
  }
  GetTotalPassTime() {
    return this.TotalPassTime;
  }
  SetTotalPassTime(i) {
    this.TotalPassTime = i;
  }
  SetTime(i, t, e) {
    (this.wge = !0),
      (this.StartTime = i),
      (this.LoopTime = t),
      (this.EndTime = e),
      (this.LoopTimeStamp = i + t),
      (this.LifeTimeStamp = i + t + e),
      (this.Uge = this.StartTime < 0 || 0 < this.LoopTime),
      (this.Age = this.Uge || this.LifeTimeStamp <= 0),
      this.IsLoop || this.Bge || this.SetLifeCycle(this.LifeTimeStamp);
  }
  SetLifeCycle(i) {
    Info_1.Info.IsGameRunning() &&
      (this.Bge &&
        (this.IsLoop ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "特效框架：SetLifeCycle时非循环特效仍然存在上一次的生命周期计时器，可能之前已经泄漏，或者不正确使用多次设置生命周期",
              ["句柄Id", this.Rge?.GetHandle()?.Id],
              ["Path", this.Rge?.GetHandle()?.Path],
              ["TimerHandler", this.Bge.Id],
            )),
        TimerSystem_1.TimerSystem.Remove(this.Bge),
        (this.Bge = void 0)),
      (i = i * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.Bge = this.Oge(i)),
      EffectEnvironment_1.EffectEnvironment.UseLog) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "RenderEffect",
        36,
        "特效框架：设置生命周期计时器",
        ["句柄Id", this.Rge?.GetHandle()?.Id],
        ["Path", this.Rge?.GetHandle()?.Path],
        ["TimerHandle", this.Bge?.Id],
        ["LifeTime", i],
      );
  }
  WhenEnterStopping() {
    this.UpdateLifeCycle(this.LifeTimeStamp - this.PassTime);
  }
  UpdateLifeCycle(i) {
    var t, e;
    Info_1.Info.IsGameRunning() &&
      (this.Bge
        ? ((t = this.Bge.Id),
          TimerSystem_1.TimerSystem.Remove(this.Bge),
          (this.Bge = void 0),
          (e = i * TimeUtil_1.TimeUtil.InverseMillisecond),
          (this.Bge = this.Oge(e)),
          EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              36,
              "特效框架：更新生命周期计时器",
              ["句柄Id", this.Rge?.GetHandle()?.Id],
              ["Path", this.Rge?.GetHandle()?.Path],
              ["OldTimerHandle", t],
              ["TimerHandle", this.Bge?.Id],
              ["LifeTime", e],
            ))
        : this.SetLifeCycle(i));
  }
  SetTimeScale(i) {
    this.bge !== i &&
      ((this.bge = i),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          36,
          "特效框架:LifeTime SetTimeScale",
          ["句柄Id", this.Rge.GetHandle()?.Id],
          ["Path", this.Rge.GetHandle()?.Path],
          ["timeScale", i],
        ),
      this.Bge) &&
      (0 < i
        ? (TimerSystem_1.TimerSystem.IsPause(this.Bge) &&
            TimerSystem_1.TimerSystem.Resume(this.Bge),
          TimerSystem_1.TimerSystem.ChangeDilation(this.Bge, i))
        : TimerSystem_1.TimerSystem.IsPause(this.Bge) ||
          TimerSystem_1.TimerSystem.Pause(this.Bge));
  }
  OnGlobalTimeScaleChange() {
    this.qge &&
      (TickSystem_1.TickSystem.IsSetPaused
        ? TimerSystem_1.TimerSystem.IsPause(this.qge) ||
          TimerSystem_1.TimerSystem.Pause(this.qge)
        : TimerSystem_1.TimerSystem.IsPause(this.qge) &&
          TimerSystem_1.TimerSystem.Resume(this.qge));
  }
  RegisterWaitMiniTimeScale(i) {
    this.qge ||
      (Info_1.Info.IsGameRunning() &&
        ((this.qge = TimerSystem_1.TimerSystem.Delay(this.Gge, i)),
        TickSystem_1.TickSystem.IsSetPaused) &&
        this.qge &&
        TimerSystem_1.TimerSystem.Pause(this.qge));
  }
  UnregisterWaitMiniTimeScale() {
    this.qge &&
      (TimerSystem_1.TimerSystem.Remove(this.qge), (this.qge = void 0));
  }
  Tick(i) {
    i <= 0 ||
      (this.gW?.Start(),
      (this.TotalPassTime += i),
      this.SeekTo(this.PassTime + i, !0, !0),
      this.gW?.Stop());
  }
  SeekTo(i, t, e, s = !0) {
    return (
      this.xge?.Start(),
      e ||
        (!this.Uge && this.Bge && this.UpdateLifeCycle(this.LifeTimeStamp - i)),
      (this.PassTime = i),
      !this.Rge.IsPlaying() ||
      (this.Uge &&
        !this.Rge.IsStopping() &&
        this.PassTime >= this.LoopTimeStamp &&
        s &&
        this.Fge(),
      !t) ||
      (this.Age && !this.Rge.IsStopping()) ||
      (this.PassTime > this.LoopTimeStamp && this.Rge?.GetHandle()?.PreStop(),
      this.PassTime < this.LifeTimeStamp)
        ? (this.xge?.Stop(), !1)
        : (Info_1.Info.IsGameRunning() || this.Nge(), this.xge?.Stop(), !0)
    );
  }
  Fge() {
    var i, t;
    this.LoopTime <= NEAR_ZERO
      ? (this.PassTime = this.StartTime)
      : this.PassTime >= this.LoopTimeStamp + this.LoopTime
        ? ((i = this.PassTime - this.StartTime),
          (t = (0, puerts_1.$ref)(0)),
          UE.KismetMathLibrary.FMod(i, this.LoopTime, t),
          (this.PassTime = this.StartTime + (0, puerts_1.$unref)(t)))
        : (this.PassTime -= this.LoopTime);
  }
  get IsAfterStart() {
    return this.wge && this.PassTime > this.StartTime - NEAR_ZERO;
  }
  OnReplay() {
    this.Clear(), (this.wge = !1), (this.bge = 1);
  }
  Clear() {
    (this.PassTime = this.DefaultPassTime),
      (this.TotalPassTime = 0),
      this.Bge &&
        (TimerSystem_1.TimerSystem.Remove(this.Bge), (this.Bge = void 0));
  }
  Oge(i) {
    if (i > TimerSystem_1.MIN_TIME)
      return (
        (i = TimerSystem_1.TimerSystem.Delay(
          this.Nge,
          i,
          void 0,
          "EffectLifeTime",
          !1,
        )) &&
          1 !== this.bge &&
          (0 < this.bge
            ? TimerSystem_1.TimerSystem.ChangeDilation(i, this.bge)
            : TimerSystem_1.TimerSystem.Pause(i)),
        i
      );
    TimerSystem_1.TimerSystem.Next(() => {
      this.Nge();
    });
  }
}
exports.EffectLifeTime = EffectLifeTime;
//# sourceMappingURL=EffectLifeTime.js.map
