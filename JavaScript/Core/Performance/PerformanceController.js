"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceController =
    exports.EffectPerformanceRecords =
    exports.EffectPerformanceStatistics =
      void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log"),
  StringUtils_1 = require("../Utils/StringUtils"),
  PerformanceModel_1 = require("./PerformanceModel");
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
    return PerformanceController._za;
  }
  static get IsOpen() {
    return PerformanceController.IsOpenInternal;
  }
  static SetOpen(t) {
    PerformanceController.IsOpenInternal = t;
  }
  static SetHandle(t, e) {
    (PerformanceController.Q_ = t), (PerformanceController.vY = e);
  }
  static StartMonitor(t) {
    if (PerformanceController.IsOpenInternal) {
      t = PerformanceController.MY(t);
      if (t) return t.Start(), t;
    }
  }
  static EndMonitor(t) {
    t?.End();
  }
  static AddMonitorData(t, e) {
    PerformanceController.IsOpenInternal &&
      PerformanceController.MY(t).AddData(e);
  }
  static CollectionEngineInfo() {
    if (PerformanceController.IsOpenInternal) {
      var t = UE.KuroStaticLibrary.GetStatUnitInfo();
      if (!StringUtils_1.StringUtils.IsEmpty(t))
        for (const o of t.split("_")) {
          var e = o.split(":"),
            r = e[1];
          PerformanceController.AddMonitorData(e[0], Number(r));
        }
    }
  }
  static CollectionLLMInfo() {
    if (PerformanceController.IsOpenInternal) {
      var t = UE.KuroStaticLibrary.GetLLMInfo();
      if (!StringUtils_1.StringUtils.IsEmpty(t))
        for (const o of t.split("_")) {
          var e = o.split(":"),
            r = e[1];
          r.trim(),
            PerformanceController.AddMonitorData("LLM." + e[0], Number(r));
        }
    }
  }
  static MY(t) {
    t = PerformanceModel_1.PerformanceModel.GetPerformanceData(t);
    return (
      t[1] &&
        (PerformanceController.Q_ &&
          t[0].SetMaxValueHandle(PerformanceController.Q_),
        PerformanceController.vY) &&
        t[0].SetMinValueHandle(PerformanceController.vY),
      t[0]
    );
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
    (PerformanceController._za = t)
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
  static CollectPlayerSkeletalTickPerformanceInfo(t, e, r, o) {
    var i;
    (o && o < this.IY) ||
      (this.TY &&
        -1 !== this.LY &&
        this.LY === e &&
        (this.DY || (this.DY = new Map()),
        (o = UE.KismetSystemLibrary.GetFrameCount()),
        (e = this.DY.get(t))
          ? o === e[0]
            ? (e[1] += r)
            : ((i = this.UY.get(1)),
              this.RY(t + "." + i, 1, e[1], e[0]),
              (e[0] = o),
              (e[1] = r))
          : this.DY.set(t, [o, r, 1, !1])));
  }
  static CollectTickPerformanceInfo(t, e, r, o = 1, i) {
    if (!(i && i < this.IY)) {
      this.EY || (this.EY = new Map());
      i = this.EY.get(t);
      if (
        (i
          ? ((i[0] = i[0] + (e ? 1 : 0)), (i[1] = i[1] + r))
          : this.EY.set(t, [1, r]),
        this.TY)
      ) {
        if (t.includes("EntityTick")) {
          e = Number(t.slice(10));
          if (-1 !== this.LY && this.LY !== e) return;
        }
        this.DY || (this.DY = new Map());
        var s,
          i = t.replace(/\d/g, ""),
          e = UE.KismetSystemLibrary.GetFrameCount();
        0 === o
          ? this.RY(i + "." + this.UY.get(o), o, r, e)
          : (t = this.DY.get(i))
            ? e === t[0]
              ? (t[1] += r)
              : ((s = this.UY.get(o)),
                this.RY(i + "." + s, o, t[1], t[0]),
                (t[0] = e),
                (t[1] = r),
                this.RY(
                  "GameThread.Tick",
                  o,
                  UE.KuroStaticLibrary.GetRawGameThreadTime(),
                  t[0],
                ))
            : this.DY.set(i, [e, r, o, !1]);
      }
    }
  }
  static ConsumeTickTime(t) {
    var e,
      r,
      o = PerformanceController.EY.get(t);
    return o
      ? ((e = o[0]),
        (o = o[1]),
        (r = 0 === e ? 0 : o / e),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Temp",
            36,
            "ConsumeTickTime",
            ["time", o],
            ["count", e],
          ),
        PerformanceController.EY.delete(t),
        r)
      : 0;
  }
  static CollectComponentTickPerformanceInfo(t, e, r, o) {
    this.yY || (this.yY = new Map());
    var i,
      s = this.yY.get(t);
    s
      ? (i = s.get(e))
        ? ((i[0] = i[0] + (r ? 1 : 0)), (i[1] = i[1] + o))
        : s.set(e, [1, o])
      : ((r = new Map()).set(e, [1, o]), this.yY.set(t, r)),
      !this.TY ||
        (-1 !== this.LY && this.LY !== t) ||
        (this.DY || (this.DY = new Map()),
        (s = this.DY.get((i = "Entity.Tick." + e))),
        (r = UE.KismetSystemLibrary.GetFrameCount()),
        s
          ? r === s[0]
            ? (s[1] += o)
            : (this.RY(i, 1, s[1], s[0]), (s[0] = r), (s[1] = o))
          : this.DY.set(i, [r, o, 1, !0]));
  }
  static ConsumeComponentTickTime(t) {
    var e = this.yY.get(t);
    if (e) {
      this.AY || (this.AY = new Map()), this.AY.clear();
      let t = 0;
      for (const i of e.keys()) {
        var r = e.get(i),
          o = 0 === r[0] ? 0 : r[1] / r[0];
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Temp",
            36,
            "ConsumeComponentTickTime",
            ["comp", i],
            ["time", r[1]],
            ["count", r[0]],
          ),
          (t += r[1]),
          this.AY.set(i, o.toFixed(3));
      }
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Temp", 36, "ConsumeComponentTickTimeMax", ["mm", t]),
        e.clear(),
        this.AY
      );
    }
  }
  static CollectEffectTickPerformanceInfo(t, e, r, o, i, s, n, a) {
    var c, h;
    s < this.IY ||
      !this.UY ||
      (this.SY || (this.SY = new Map()),
      (s = t.slice(0, t.indexOf("."))),
      (t = this.SY.get(s)),
      (c = o - r),
      ((h = new EffectPerformanceStatistics()).Frame =
        UE.KismetSystemLibrary.GetFrameCount()),
      (h.StartTime = r),
      (h.EndTime = o),
      (h.ParticleCount = n ?? 0),
      (h.EmitterCount = a ?? 0),
      (h.Type = this.UY.get(i)),
      t
        ? ((t.TickCount = t.TickCount + (e ? 1 : 0)),
          (t.Duration = t.Duration + c),
          t.Records.push(h))
        : (((r = new EffectPerformanceRecords()).TickCount = 1),
          (r.Duration = c),
          r.Records.push(h),
          this.SY.set(s, r)),
      this.TY &&
        ((o = this.UY.get(i)), this.RY(`EffectHandle.${o}.` + s, i, c)));
  }
  static ConsumeEffectTickTime() {
    if (this.SY) {
      this.PY || (this.PY = new Map()), this.PY.clear();
      for (const i of this.SY.keys()) {
        var e = this.SY.get(i),
          r = 0 === e.TickCount ? 0 : e.Duration / e.TickCount,
          o = [];
        o.push(["Score", r.toFixed(3)]),
          o.push(["TickCount", e.TickCount.toString()]),
          o.push(["Duration", e.Duration.toFixed(3)]);
        let t = 0;
        for (const s of e.Records)
          o.push(["Frame_" + t, s.Frame.toString()]),
            o.push(["StartTime_" + t, s.StartTime.toFixed(3)]),
            o.push(["EndTime_" + t, s.EndTime.toFixed(3)]),
            o.push(["ParticleCount_" + t, s.ParticleCount.toString()]),
            o.push(["EmitterCount_" + t, s.EmitterCount.toString()]),
            o.push(["Type_" + t, s.Type]),
            ++t;
        this.PY.set(i, o);
      }
      return this.SY.clear(), this.PY;
    }
  }
  static SetStatisticsMode(t, e, r = "") {
    if ((this.TY = t))
      (this.xY = new UE.FName(r)),
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
        for (const s of this.DY.keys()) {
          var o = this.DY.get(s),
            i = this.UY.get(o[2]);
          this.RY(o[3] ? "" + s : s + "." + i, o[2], o[1], o[0]);
        }
        this.DY.clear(), (this.DY = void 0);
      }
      (this.UY = void 0), (this.xY = void 0), (this.LY = -1);
    }
  }
  static RY(t, e, r, o) {
    var i;
    this.xY &&
      ((i = UE.KismetSystemLibrary.GetFrameCount()) !== this.wY &&
        (this.wY = i),
      UE.PerformanceStatisticsLibrary.AddStatistics(
        this.xY,
        Number(o || i),
        t,
        e,
        r,
      ),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Performance",
        36,
        "AddStatistics",
        ["SectionName", this.xY],
        ["Frame", o || i],
        ["Tag", t],
        ["MeasureMode", this.UY.get(e)],
        ["Time", r],
      );
  }
}
((exports.PerformanceController = PerformanceController).IsOpenInternal = !1),
  (PerformanceController.IsInAnyEntitySkillTickTest = !1),
  (PerformanceController.IsOpenCatchWorldEntity = !1),
  (PerformanceController.fY = !1),
  (PerformanceController._za = !1),
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
