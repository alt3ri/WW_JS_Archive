"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectLifeTime = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const NEAR_ZERO = 0.001;
const CHECK_CAN_STOP_INTERVAL = 1e3;
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
        let i;
        const t = this.Rge;
        (this.Bge = void 0),
          t.GetHandle().IsRoot()
            ? t.CanStop()
              ? (Info_1.Info.IsGameRunning() &&
                  ((i = t.GetHandle().GetSureEffectActor()) &&
                    !t.GetHandle().IsExternalActor &&
                    (i.K2_DetachFromActor(), i.SetActorHiddenInGame(!0)),
                  this.Rge.GetHandle().UnregisterTick()),
                this.Rge.GetHandle()?.OnPlayFinished())
              : (this.Bge = TimerSystem_1.TimerSystem.Delay(
                  this.Nge,
                  CHECK_CAN_STOP_INTERVAL,
                ))
            : t.GetHandle().Stop("[EffectLifeTime.PlayFinished] 播放完成", !0);
      }),
      Stats_1.Stat.Enable &&
        ((this.gW = void 0), (this.Pge = void 0), (this.xge = void 0));
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
  SetTime(i, t, s) {
    (this.wge = !0),
      (this.StartTime = i),
      (this.LoopTime = t),
      (this.EndTime = s),
      (this.LoopTimeStamp = i + t),
      (this.LifeTimeStamp = i + t + s),
      (this.Uge = this.StartTime < 0 || this.LoopTime > 0),
      (this.Age = this.Uge || this.LifeTimeStamp <= 0),
      this.IsLoop || this.Bge || this.SetLifeCycle(this.LifeTimeStamp);
  }
  SetLifeCycle(i) {
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
    i *= TimeUtil_1.TimeUtil.InverseMillisecond;
    (this.Bge = this.Oge(i)),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          37,
          "特效框架：设置生命周期计时器",
          ["句柄Id", this.Rge?.GetHandle()?.Id],
          ["Path", this.Rge?.GetHandle()?.Path],
          ["TimerHandle", this.Bge?.Id],
          ["LifeTime", i],
        );
  }
  WhenEnterStopping() {
    this.kge(this.LifeTimeStamp - this.PassTime);
  }
  kge(i) {
    let t, s;
    this.Bge
      ? ((t = this.Bge.Id),
        TimerSystem_1.TimerSystem.Remove(this.Bge),
        (this.Bge = void 0),
        (s = i * TimeUtil_1.TimeUtil.InverseMillisecond),
        (this.Bge = this.Oge(s)),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            37,
            "特效框架：更新生命周期计时器",
            ["句柄Id", this.Rge?.GetHandle()?.Id],
            ["Path", this.Rge?.GetHandle()?.Path],
            ["OldTimerHandle", t],
            ["TimerHandle", this.Bge?.Id],
            ["LifeTime", s],
          ))
      : this.SetLifeCycle(i);
  }
  SetTimeScale(i) {
    this.bge !== i &&
      ((this.bge = i), this.Bge) &&
      (i > 0
        ? (TimerSystem_1.TimerSystem.IsPause(this.Bge) &&
            TimerSystem_1.TimerSystem.Resume(this.Bge),
          TimerSystem_1.TimerSystem.ChangeDilation(this.Bge, i))
        : TimerSystem_1.TimerSystem.IsPause(this.Bge) ||
          TimerSystem_1.TimerSystem.Pause(this.Bge));
  }
  RegisterWaitMiniTimeScale(i) {
    this.qge || (this.qge = TimerSystem_1.TimerSystem.Delay(this.Gge, i));
  }
  UnregisterWaitMiniTimeScale() {
    this.qge &&
      (TimerSystem_1.TimerSystem.Remove(this.qge), (this.qge = void 0));
  }
  Tick(i) {
    i <= 0 ||
      ((this.TotalPassTime += i), this.SeekTo(this.PassTime + i, !0, !0));
  }
  SeekTo(i, t, s, e = !0) {
    return (
      s || (!this.Uge && this.Bge && this.kge(this.LifeTimeStamp - i)),
      (this.PassTime = i),
      !!this.Rge.IsPlaying() &&
        (this.Uge &&
          !this.Rge.IsStopping() &&
          this.PassTime >= this.LoopTimeStamp &&
          e &&
          this.Fge(),
        !!t) &&
        !(
          (this.Age && !this.Rge.IsStopping()) ||
          (this.PassTime > this.LoopTimeStamp &&
            this.Rge?.GetHandle()?.PreStop(),
          this.PassTime < this.LifeTimeStamp) ||
          (Info_1.Info.IsGameRunning() || this.Nge(), 0)
        )
    );
  }
  Fge() {
    let i, t;
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
        (i = TimerSystem_1.TimerSystem.Delay(this.Nge, i)) &&
          this.bge !== 1 &&
          (this.bge > 0
            ? TimerSystem_1.TimerSystem.ChangeDilation(i, this.bge)
            : TimerSystem_1.TimerSystem.Pause(i)),
        i
      );
    this.Nge();
  }
}
exports.EffectLifeTime = EffectLifeTime;
// # sourceMappingURL=EffectLifeTime.js.map
