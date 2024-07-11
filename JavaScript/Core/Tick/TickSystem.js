"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TickSystem = exports.Ticker = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Time_1 = require("../Common/Time"),
  SECOND_TO_MILLISECOND = 1e3;
class Ticker {
  constructor(t, i, s, e, r = 0, c = !1) {
    (this.Id = t),
      (this.Handle = i),
      (this.Group = s),
      (this.TickIntervalMs = r),
      (this.TickEvenPaused = c),
      (this.Count = 0),
      (this.CoolDown = 0),
      (this.Pause = !1),
      (this.StatObj = void 0),
      (this.StatObj = void 0);
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
  static Add(t, i, s = 0, r = !1) {
    if (t) {
      var c = ++this.o6,
        i = new Ticker(c, t, s, i, 0, r);
      this.gJ.set(c, i);
      let e = this.fJ.get(s);
      return (
        e
          ? e.add(i)
          : ((e = new Set()).add(i),
            this.fJ.set(s, e),
            this.pJ.set(
              s,
              (r = (t) => {
                var i = t * SECOND_TO_MILLISECOND;
                for (const s of e)
                  (this.IsPaused && !s.TickEvenPaused) || this.vJ(s, i);
              }),
            ),
            this.CJ.AddTick(s, (0, puerts_1.toManualReleaseDelegate)(r))),
        i
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Tick", 1, "处理方法不存在", ["handle", t]);
  }
  static Remove(t) {
    var i = this.gJ.get(t);
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1
      );
    this.gJ.delete(t);
    var s = this.fJ.get(i.Group);
    return s
      ? (s.delete(i),
        0 === s.size &&
          (this.fJ.delete(i.Group),
          (s = this.pJ.get(i.Group)),
          this.pJ.delete(i.Group),
          this.CJ.RemoveTick(i.Group),
          (0, puerts_1.releaseManualReleaseDelegate)(s)),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Tick",
            1,
            "分组不存在",
            ["id", t],
            ["group", i.Group],
          ),
        !1);
  }
  static Pause(t) {
    var i = this.gJ.get(t);
    return i
      ? (i.Pause = !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1);
  }
  static Resume(t) {
    var i = this.gJ.get(t);
    return i
      ? !(i.Pause = !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
        !1);
  }
  static vJ(i, s) {
    if (!i.Pause) {
      let t = s;
      if (0 < i.TickIntervalMs) {
        if (((i.CoolDown += s), i.CoolDown < i.TickIntervalMs)) return;
        s = i.CoolDown % i.TickIntervalMs;
        (t = i.CoolDown - s), (i.CoolDown = s);
      }
      i.Count += 1;
      try {
        i.Handle(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Tick",
              1,
              "处理方法执行异常",
              t,
              ["id", i.Id],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Tick",
              1,
              "处理方法执行异常",
              ["id", i.Id],
              ["error", t],
            );
      }
    }
  }
  static AddTickPrerequisite(t, i) {
    this.CJ.AddPrerequisiteActorComponent(t, i);
  }
  static RemoveTickPrerequisite(t, i) {
    this.CJ.RemovePrerequisiteActorComponent(t, i);
  }
  static SetSkeletalMeshProxyTickFunction(t, i) {
    this.CJ.SetSkeletalMeshProxyTickFunction(t, i);
  }
  static CleanSkeletalMeshProxyTickFunction(t) {
    this.CJ.CleanSkeletalMeshProxyTickFunction(t);
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
