"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TickSystem = exports.Ticker = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Time_1 = require("../Common/Time"),
  PerfSight_1 = require("../PerfSight/PerfSight"),
  SECOND_TO_MILLISECOND = 1e3;
class Ticker {
  constructor(t, e, i, s, r, c = 0, o = !1) {
    (this.Id = t),
      (this.Handle = e),
      (this.Group = i),
      (this.Priority = s),
      (this.Name = r),
      (this.TickIntervalMs = c),
      (this.TickEvenPaused = o),
      (this.Count = 0),
      (this.CoolDown = 0),
      (this.Pause = !1),
      (this.StatObj = void 0),
      (this.StatObj = Stats_1.Stat.CreateNoFlameGraph("In TickSystem." + r));
  }
}
exports.Ticker = Ticker;
class TickSystem {
  constructor() {}
  static get IsPaused() {
    return TickSystem.dJ && Time_1.Time.Frame > TickSystem.PausedFrame;
  }
  static set IsPaused(t) {
    (TickSystem.dJ = t) && (TickSystem.PausedFrame = Time_1.Time.Frame);
  }
  static get IsSetPaused() {
    return TickSystem.dJ;
  }
  static Initialize(t) {
    (this.CJ = new UE.KuroTickManager(t)), this.gJ.clear(), this.fJ.clear();
  }
  static Destroy() {
    for (var [, t] of this.pJ) (0, puerts_1.releaseManualReleaseDelegate)(t);
    this.CJ.ClearTick();
  }
  static Has(t) {
    return 0 < t && this.gJ.has(t);
  }
  static Add(e, i, r = 0, c = !1, o = 0) {
    if (e) {
      var a = ++this.o6,
        i = new Ticker(a, e, r, o, i, 0, c);
      this.gJ.set(a, i);
      let t = this.fJ.get(r);
      for (t || ((t = []), this.fJ.set(r, t)); t.length <= o; ) t.push(void 0);
      let s = t[o];
      return (
        s
          ? s.add(i)
          : ((s = new Set()).add(i),
            (t[o] = s),
            this.pJ.set(
              r,
              (c = (t) => {
                var e = t * SECOND_TO_MILLISECOND;
                for (const i of s)
                  (this.IsPaused && !i.TickEvenPaused) || this.vJ(i, e);
              }),
            ),
            this.CJ.AddTick(r, (0, puerts_1.toManualReleaseDelegate)(c), o)),
        i
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Tick", 1, "处理方法不存在", ["handle", e]);
  }
  static Remove(t) {
    var e = this.gJ.get(t);
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1
      );
    this.gJ.delete(t);
    var i = this.fJ.get(e.Group);
    return i
      ? i.length <= e.Priority || !i[e.Priority]
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Tick",
              6,
              "优先级不存在",
              ["id", t],
              ["group", e.Group],
              ["priority", e.Priority],
            ),
          !1)
        : ((i = i[e.Priority]).delete(e),
          0 === i.size &&
            (this.fJ.delete(e.Group),
            (i = this.pJ.get(e.Group)),
            this.pJ.delete(e.Group),
            this.CJ.RemoveTick(e.Group),
            (0, puerts_1.releaseManualReleaseDelegate)(i)),
          !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Tick",
            1,
            "分组不存在",
            ["id", t],
            ["group", e.Group],
          ),
        !1);
  }
  static Pause(t) {
    var e = this.gJ.get(t);
    return e
      ? (e.Pause = !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1);
  }
  static Resume(t) {
    var e = this.gJ.get(t);
    return e
      ? !(e.Pause = !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1);
  }
  static vJ(e, i) {
    if (!e.Pause) {
      let t = i;
      if (0 < e.TickIntervalMs) {
        if (((e.CoolDown += i), e.CoolDown < e.TickIntervalMs)) return;
        i = e.CoolDown % e.TickIntervalMs;
        (t = e.CoolDown - i), (e.CoolDown = i);
      }
      (e.Count += 1), e.StatObj?.Start();
      var s,
        r,
        c,
        i = cpp_1.KuroTime.GetMilliseconds64();
      try {
        e.Handle(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Tick",
              1,
              "处理方法执行异常",
              t,
              ["id", e.Id],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Tick",
              1,
              "处理方法执行异常",
              ["id", e.Id],
              ["error", t],
            );
      }
      PerfSight_1.PerfSight.IsEnable &&
        0 === e.Group &&
        ((c = 1e3 / UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps()),
        (s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGameThreadTime()),
        (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRenderThreadTime()),
        2 * c < s || 2 * c < r) &&
        ((c = cpp_1.KuroTime.GetMilliseconds64() - i),
        "Core" === e.Name
          ? cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_Core",
              c,
            )
          : "Game" === e.Name &&
            (cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_Game",
              c,
            ),
            cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_GameThreadTime",
              s,
            ),
            cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_RenderThreadTime",
              r,
            ),
            cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_RHIThreadTime",
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIThreadTime(),
            ),
            cpp_1.FKuroPerfSightHelper.PostValueFloat1(
              "CustomPerformance",
              "[PrePhysics]TickSystem_PresentTime",
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSwapBufferTime(),
            ))),
        e.StatObj?.Stop();
    }
  }
  static AddTickPrerequisiteActor(t, e, i) {
    this.CJ.AddPrerequisiteActor(t, e, i);
  }
  static RemoveTickPrerequisiteActor(t, e, i) {
    this.CJ.RemovePrerequisiteActor(t, e, i);
  }
  static AddTickPrerequisiteActorComp(t, e, i) {
    this.CJ.AddPrerequisiteActorComponent(t, e, i);
  }
  static RemoveTickPrerequisiteActorComp(t, e, i) {
    this.CJ.RemovePrerequisiteActorComponent(t, e, i);
  }
  static SetSkeletalMeshProxyTickFunction(t, e, i) {
    this.CJ.SetSkeletalMeshProxyTickFunction(t, e, i);
  }
  static CleanSkeletalMeshProxyTickFunction(t) {
    this.CJ.CleanSkeletalMeshProxyTickFunction(t);
  }
  static SetMovementProxyTickFunction(t, e, i) {
    this.CJ.SetCharacterMovementProxyTickFunction(t, e, i);
  }
  static CleanMovementProxyTickFunction(t) {
    this.CJ.CleanCharacterMovementProxyTickFunction(t);
  }
  static SetTickFunctionCompletionCallbackInMainThread(t, e) {
    this.CJ.SetTickFunctionCompletionCallbackInMainThread(t, e);
  }
}
((exports.TickSystem = TickSystem).InvalidId = -1),
  (TickSystem.dJ = !1),
  (TickSystem.PausedFrame = -1),
  (TickSystem.o6 = 0),
  (TickSystem.CJ = void 0),
  (TickSystem.gJ = new Map()),
  (TickSystem.pJ = new Map()),
  (TickSystem.fJ = new Map());
//# sourceMappingURL=TickSystem.js.map
