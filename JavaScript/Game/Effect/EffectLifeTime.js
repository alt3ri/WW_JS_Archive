"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectLifeTime = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  NEAR_ZERO = 0.001,
  CHECK_CAN_STOP_INTERVAL = 1e3;
class EffectLifeTime {
  constructor(t) {
    (this.Rge = t),
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
          EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderEffect",
              37,
              "特效框架：特效设置TimeScale为极小值，没有及时置回，造成泄漏",
              ["句柄Id", this.Rge?.GetHandle()?.Id],
              ["Path", this.Rge?.GetHandle()?.Path],
              ["CreateReason", this.Rge?.GetHandle()?.CreateReason],
            );
      }),
      (this.Nge = () => {
        this.Pge?.Start();
        var t,
          i = this.Rge;
        (this.Bge = void 0),
          i.GetHandle().IsRoot()
            ? i.CanStop()
              ? (Info_1.Info.IsGameRunning() &&
                  ((t = i.GetHandle().GetSureEffectActor()) &&
                    !i.GetHandle().IsExternalActor &&
                    (t.K2_DetachFromActor(),
                    i.GetHandle().SetHidden(!0, "EffectLifeTime.PlayFinished")),
                  this.Rge.GetHandle().UnregisterTick()),
                this.Rge.GetHandle()?.OnPlayFinished())
              : (this.Bge = TimerSystem_1.TimerSystem.Delay(
                  this.Nge,
                  CHECK_CAN_STOP_INTERVAL,
                ))
            : i.GetHandle().Stop("[EffectLifeTime.PlayFinished] 播放完成", !0),
          this.Pge?.Stop();
      }),
      Stats_1.Stat.Enable &&
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
  SetTotalPassTime(t) {
    this.TotalPassTime = t;
  }
  SetTime(t, i, e) {
    (this.wge = !0),
      (this.StartTime = t),
      (this.LoopTime = i),
      (this.EndTime = e),
      (this.LoopTimeStamp = t + i),
      (this.LifeTimeStamp = t + i + e),
      (this.Uge = this.StartTime < 0 || 0 < this.LoopTime),
      (this.Age = this.Uge || this.LifeTimeStamp <= 0),
      this.IsLoop || this.Bge || this.SetLifeCycle(this.LifeTimeStamp);
  }
  SetLifeCycle(t) {
    this.Bge &&
      (this.IsLoop ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "特效框架：SetLifeCycle时非循环特效仍然存在上一次的生命周期计时器，可能之前已经泄漏，或者不正确使用多次设置生命周期",
            ["句柄Id", this.Rge?.GetHandle()?.Id],
            ["Path", this.Rge?.GetHandle()?.Path],
            ["TimerHandler", this.Bge.Id],
          )),
      TimerSystem_1.TimerSystem.Remove(this.Bge),
      (this.Bge = void 0));
    t *= TimeUtil_1.TimeUtil.InverseMillisecond;
    (this.Bge = this.Oge(t)),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          37,
          "特效框架：设置生命周期计时器",
          ["句柄Id", this.Rge?.GetHandle()?.Id],
          ["Path", this.Rge?.GetHandle()?.Path],
          ["TimerHandle", this.Bge?.Id],
          ["LifeTime", t],
        );
  }
  WhenEnterStopping() {
    this.kge(this.LifeTimeStamp - this.PassTime);
  }
  kge(t) {
    var i, e;
    this.Bge
      ? ((i = this.Bge.Id),
        TimerSystem_1.TimerSystem.Remove(this.Bge),
        (this.Bge = void 0),
        (e = t * TimeUtil_1.TimeUtil.InverseMillisecond),
        (this.Bge = this.Oge(e)),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            37,
            "特效框架：更新生命周期计时器",
            ["句柄Id", this.Rge?.GetHandle()?.Id],
            ["Path", this.Rge?.GetHandle()?.Path],
            ["OldTimerHandle", i],
            ["TimerHandle", this.Bge?.Id],
            ["LifeTime", e],
          ))
      : this.SetLifeCycle(t);
  }
  SetTimeScale(t) {
    this.bge !== t &&
      ((this.bge = t),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "特效框架:LifeTime SetTimeScale",
          ["句柄Id", this.Rge.GetHandle()?.Id],
          ["Path", this.Rge.GetHandle()?.Path],
          ["timeScale", t],
        ),
      this.Bge) &&
      (0 < t
        ? (TimerSystem_1.TimerSystem.IsPause(this.Bge) &&
            TimerSystem_1.TimerSystem.Resume(this.Bge),
          TimerSystem_1.TimerSystem.ChangeDilation(this.Bge, t))
        : TimerSystem_1.TimerSystem.IsPause(this.Bge) ||
          TimerSystem_1.TimerSystem.Pause(this.Bge));
  }
  RegisterWaitMiniTimeScale(t) {
    this.qge || (this.qge = TimerSystem_1.TimerSystem.Delay(this.Gge, t));
  }
  UnregisterWaitMiniTimeScale() {
    this.qge &&
      (TimerSystem_1.TimerSystem.Remove(this.qge), (this.qge = void 0));
  }
  Tick(t) {
    t <= 0 ||
      (this.gW?.Start(),
      (this.TotalPassTime += t),
      this.SeekTo(this.PassTime + t, !0, !0),
      this.gW?.Stop());
  }
  SeekTo(t, i, e, s = !0) {
    return (
      this.xge?.Start(),
      e || (!this.Uge && this.Bge && this.kge(this.LifeTimeStamp - t)),
      (this.PassTime = t),
      !this.Rge.IsPlaying() ||
      (this.Uge &&
        !this.Rge.IsStopping() &&
        this.PassTime >= this.LoopTimeStamp &&
        s &&
        this.Fge(),
      !i) ||
      (this.Age && !this.Rge.IsStopping()) ||
      (this.PassTime > this.LoopTimeStamp && this.Rge?.GetHandle()?.PreStop(),
      this.PassTime < this.LifeTimeStamp)
        ? (this.xge?.Stop(), !1)
        : (Info_1.Info.IsGameRunning() || this.Nge(), this.xge?.Stop(), !0)
    );
  }
  Fge() {
    var t, i;
    this.LoopTime <= NEAR_ZERO
      ? (this.PassTime = this.StartTime)
      : this.PassTime >= this.LoopTimeStamp + this.LoopTime
        ? ((t = this.PassTime - this.StartTime),
          (i = (0, puerts_1.$ref)(0)),
          UE.KismetMathLibrary.FMod(t, this.LoopTime, i),
          (this.PassTime = this.StartTime + (0, puerts_1.$unref)(i)))
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
  Oge(t) {
    if (t > TimerSystem_1.MIN_TIME)
      return (
        (t = TimerSystem_1.TimerSystem.Delay(
          this.Nge,
          t,
          void 0,
          "EffectLifeTime",
          !1,
        )) &&
          1 !== this.bge &&
          (0 < this.bge
            ? TimerSystem_1.TimerSystem.ChangeDilation(t, this.bge)
            : TimerSystem_1.TimerSystem.Pause(t)),
        t
      );
    this.Nge();
  }
}
exports.EffectLifeTime = EffectLifeTime;
//# sourceMappingURL=EffectLifeTime.js.map
