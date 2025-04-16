"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceController =
    exports.EffectPerformanceRecords =
    exports.EffectPerformanceStatistics =
      void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log");
class EffectPerformanceStatistics {
  constructor() {
    (this.Frame = void 0),
      (this.StartTime = -1),
      (this.EndTime = -1),
      (this.ParticleCount = 0),
      (this.EmitterCount = 0),
      (this.Type = "None");
  }
}
exports.EffectPerformanceStatistics = EffectPerformanceStatistics;
class EffectPerformanceRecords {
  constructor() {
    (this.TickCount = 0), (this.Duration = 0), (this.Records = []);
  }
}
exports.EffectPerformanceRecords = EffectPerformanceRecords;
class PerformanceController {
  static get IsEntityTickPerformanceTest() {
    return PerformanceController.fY;
  }
  static get IsEntityPerformanceTest() {
    return PerformanceController.fY || PerformanceController.pY;
  }
  static get IsPlayerPerformanceTest() {
    return PerformanceController.dih;
  }
  static SetEntityTickPerformanceTest(t) {
    (this.fY = t)
      ? ((this.EY = new Map()),
        (this.SY = new Map()),
        (this.yY = new Map()),
        (this.IY = UE.KismetSystemLibrary.GetFrameCount()))
      : (this.EY.clear(),
        this.SY.clear(),
        this.yY.clear(),
        (this.EY = void 0),
        (this.SY = void 0),
        (this.yY = void 0));
  }
  static SetPlayerTickPerformanceTest(t) {
    (PerformanceController.dih = t)
      ? ((this.EY = new Map()),
        (this.SY = new Map()),
        (this.yY = new Map()),
        (this.IY = UE.KismetSystemLibrary.GetFrameCount()))
      : (this.EY.clear(),
        this.SY.clear(),
        this.yY.clear(),
        (this.EY = void 0),
        (this.SY = void 0),
        (this.yY = void 0));
  }
  static SetEntityGpuPerformanceTest(t) {
    this.pY = t;
  }
  static CollectPlayerSkeletalTickPerformanceInfo(t, e, i, r) {
    var s;
    (r && r < this.IY) ||
      (this.TY &&
        -1 !== this.LY &&
        this.LY === e &&
        (this.DY || (this.DY = new Map()),
        (r = UE.KismetSystemLibrary.GetFrameCount()),
        (e = this.DY.get(t))
          ? r === e[0]
            ? (e[1] += i)
            : ((s = this.UY.get(1)),
              this.RY(t + "." + s, 1, e[1], e[0]),
              (e[0] = r),
              (e[1] = i))
          : this.DY.set(t, [r, i, 1, !1])));
  }
  static CollectTickPerformanceInfo(t, e, i, r = 1, s) {
    if (!(s && s < this.IY)) {
      this.EY || (this.EY = new Map());
      s = this.EY.get(t);
      if (
        (s
          ? ((s[0] = s[0] + (e ? 1 : 0)), (s[1] = s[1] + i))
          : this.EY.set(t, [1, i]),
        this.TY)
      ) {
        if (t.includes("EntityTick")) {
          e = Number(t.slice(10));
          if (-1 !== this.LY && this.LY !== e) return;
        }
        this.DY || (this.DY = new Map());
        var o,
          s = t.replace(/\d/g, ""),
          e = UE.KismetSystemLibrary.GetFrameCount();
        0 === r
          ? this.RY(s + "." + this.UY.get(r), r, i, e)
          : (t = this.DY.get(s))
            ? e === t[0]
              ? (t[1] += i)
              : ((o = this.UY.get(r)),
                this.RY(s + "." + o, r, t[1], t[0]),
                (t[0] = e),
                (t[1] = i),
                this.RY(
                  "GameThread.Tick",
                  r,
                  UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGameThreadTime(),
                  t[0],
                ))
            : this.DY.set(s, [e, i, r, !1]);
      }
    }
  }
  static ConsumeTickTime(t) {
    var e,
      i,
      r = PerformanceController.EY.get(t);
    return r
      ? ((e = r[0]),
        (r = r[1]),
        (i = 0 === e ? 0 : r / e),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Temp",
            35,
            "ConsumeTickTime",
            ["time", r],
            ["count", e],
          ),
        PerformanceController.EY.delete(t),
        i)
      : 0;
  }
  static CollectComponentTickPerformanceInfo(t, e, i, r) {
    this.yY || (this.yY = new Map());
    var s,
      o = this.yY.get(t);
    o
      ? (s = o.get(e))
        ? ((s[0] = s[0] + (i ? 1 : 0)), (s[1] = s[1] + r))
        : o.set(e, [1, r])
      : ((i = new Map()).set(e, [1, r]), this.yY.set(t, i)),
      !this.TY ||
        (-1 !== this.LY && this.LY !== t) ||
        (this.DY || (this.DY = new Map()),
        (o = this.DY.get((s = "Entity.Tick." + e))),
        (i = UE.KismetSystemLibrary.GetFrameCount()),
        o
          ? i === o[0]
            ? (o[1] += r)
            : (this.RY(s, 1, o[1], o[0]), (o[0] = i), (o[1] = r))
          : this.DY.set(s, [i, r, 1, !0]));
  }
  static ConsumeComponentTickTime(t) {
    var e = this.yY.get(t);
    if (e) {
      this.AY || (this.AY = new Map()), this.AY.clear();
      let t = 0;
      for (const s of e.keys()) {
        var i = e.get(s),
          r = 0 === i[0] ? 0 : i[1] / i[0];
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Temp",
            35,
            "ConsumeComponentTickTime",
            ["comp", s],
            ["time", i[1]],
            ["count", i[0]],
          ),
          (t += i[1]),
          this.AY.set(s, r.toFixed(3));
      }
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Temp", 35, "ConsumeComponentTickTimeMax", ["mm", t]),
        e.clear(),
        this.AY
      );
    }
  }
  static CollectEffectTickPerformanceInfo(t, e, i, r, s, o, n, h) {
    var c, a;
    o < this.IY ||
      !this.UY ||
      (this.SY || (this.SY = new Map()),
      (o = t.slice(0, t.indexOf("."))),
      (t = this.SY.get(o)),
      (c = r - i),
      ((a = new EffectPerformanceStatistics()).Frame =
        UE.KismetSystemLibrary.GetFrameCount()),
      (a.StartTime = i),
      (a.EndTime = r),
      (a.ParticleCount = n ?? 0),
      (a.EmitterCount = h ?? 0),
      (a.Type = this.UY.get(s)),
      t
        ? ((t.TickCount = t.TickCount + (e ? 1 : 0)),
          (t.Duration = t.Duration + c),
          t.Records.push(a))
        : (((i = new EffectPerformanceRecords()).TickCount = 1),
          (i.Duration = c),
          i.Records.push(a),
          this.SY.set(o, i)),
      this.TY &&
        ((r = this.UY.get(s)), this.RY(`EffectHandle.${r}.` + o, s, c)));
  }
  static ConsumeEffectTickTime() {
    if (this.SY) {
      this.PY || (this.PY = new Map()), this.PY.clear();
      for (const s of this.SY.keys()) {
        var e = this.SY.get(s),
          i = 0 === e.TickCount ? 0 : e.Duration / e.TickCount,
          r = [];
        r.push(["Score", i.toFixed(3)]),
          r.push(["TickCount", e.TickCount.toString()]),
          r.push(["Duration", e.Duration.toFixed(3)]);
        let t = 0;
        for (const o of e.Records)
          r.push(["Frame_" + t, o.Frame.toString()]),
            r.push(["StartTime_" + t, o.StartTime.toFixed(3)]),
            r.push(["EndTime_" + t, o.EndTime.toFixed(3)]),
            r.push(["ParticleCount_" + t, o.ParticleCount.toString()]),
            r.push(["EmitterCount_" + t, o.EmitterCount.toString()]),
            r.push(["Type_" + t, o.Type]),
            ++t;
        this.PY.set(s, r);
      }
      return this.SY.clear(), this.PY;
    }
  }
  static SetStatisticsMode(t, e, i = "") {
    if ((this.TY = t))
      (this.xY = new UE.FName(i)),
        (this.IY = UE.KismetSystemLibrary.GetFrameCount()),
        (this.wY = this.IY),
        (this.LY = e),
        (this.UY = new Map([
          [0, "Create"],
          [1, "Tick"],
          [2, "Other"],
        ]));
    else {
      if (this.DY) {
        for (const o of this.DY.keys()) {
          var r = this.DY.get(o),
            s = this.UY.get(r[2]);
          this.RY(r[3] ? "" + o : o + "." + s, r[2], r[1], r[0]);
        }
        this.DY.clear(), (this.DY = void 0);
      }
      (this.UY = void 0), (this.xY = void 0), (this.LY = -1);
    }
  }
  static RY(t, e, i, r) {
    var s;
    this.xY &&
      ((s = UE.KismetSystemLibrary.GetFrameCount()) !== this.wY &&
        (this.wY = s),
      UE.PerformanceStatisticsLibrary.AddStatistics(
        this.xY,
        Number(r || s),
        t,
        e,
        i,
      ),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Performance",
        35,
        "AddStatistics",
        ["SectionName", this.xY],
        ["Frame", r || s],
        ["Tag", t],
        ["MeasureMode", this.UY.get(e)],
        ["Time", i],
      );
  }
}
((exports.PerformanceController =
  PerformanceController).IsInAnyEntitySkillTickTest = !1),
  (PerformanceController.IsOpenCatchWorldEntity = !1),
  (PerformanceController.fY = !1),
  (PerformanceController.dih = !1),
  (PerformanceController.pY = !1),
  (PerformanceController.EY = void 0),
  (PerformanceController.yY = void 0),
  (PerformanceController.SY = void 0),
  (PerformanceController.PY = void 0),
  (PerformanceController.AY = void 0),
  (PerformanceController.TY = !1),
  (PerformanceController.xY = void 0),
  (PerformanceController.LY = -1),
  (PerformanceController.wY = void 0),
  (PerformanceController.DY = void 0),
  (PerformanceController.UY = void 0),
  (PerformanceController.IY = void 0);
//# sourceMappingURL=PerformanceController.js.map
