"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, a, r) {
    var S,
      c = arguments.length,
      o =
        c < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, a))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, a, r);
    else
      for (var _ = t.length - 1; 0 <= _; _--)
        (S = t[_]) && (o = (c < 3 ? S(o) : 3 < c ? S(e, a, o) : S(e, a)) || o);
    return 3 < c && o && Object.defineProperty(e, a, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Stat = void 0);
const cpp_1 = require("cpp"),
  CycleCounter_1 = require("../Performance/CycleCounter"),
  Macro_1 = require("../Preprocessor/Macro"),
  Log_1 = require("./Log"),
  MAX_CALL_DEPTH = 8;
class Stat {
  constructor(t, e = -1, a = !1) {
    (this.ac = 0),
      (this.JWa = ""),
      (this.S9 = -1),
      (this.lth = !1),
      (this.JWa = t),
      (this.S9 = e),
      (this.lth = a);
  }
  static get Enable() {
    return CycleCounter_1.CycleCounter.IsEnabled;
  }
  static Create(t, e = "", a = "") {
    return Stat._th(t, !0, e, a);
  }
  static CreateNoFlameGraph(t, e = "", a = "") {
    return Stat.Enable ? Stat._th(t, !1, e, a) : Stat.uth;
  }
  static CreateInstantStat(t, e = "", a = "") {
    t = Stat.CreateNoFlameGraph(t, e, a);
    t.Start(), t.Stop();
  }
  static _th(t, e, a = 0, r) {
    if (!t || 0 === t.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Stat", 1, "统计创建失败，名字为空"),
        Stat.uth
      );
    Stat.m6?.Start();
    let S = t;
    S.length > CycleCounter_1.STAT_MAX_NAME_LENGTH &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Stat", 30, "Stat名字过长", ["name", t]),
      (S = t.substring(0, CycleCounter_1.STAT_MAX_NAME_LENGTH)));
    (t = Stat.Enable ? cpp_1.FKuroCycleCounter.CreateCycleCounter(S) : -1),
      (t = new Stat(S, t, e));
    return Stat.Enable && (t.ac = 2), Stat.m6?.Stop(), t;
  }
  Start() {
    Stat.Aoh &&
      this.lth &&
      Stat.eQa < MAX_CALL_DEPTH &&
      cpp_1.FKuroPerfSightHelper.SafePushCall(this.JWa),
      Stat.eQa++,
      0 !== this.ac &&
        ((this.ac = 1),
        cpp_1.FKuroCycleCounter.StartCycleCounter(this.S9),
        CycleCounter_1.CycleCounter.CheckStart(this.JWa));
  }
  Stop() {
    Stat.eQa--,
      Stat.Aoh &&
        this.lth &&
        Stat.eQa < MAX_CALL_DEPTH &&
        cpp_1.FKuroPerfSightHelper.SafePopCall(this.JWa),
      0 !== this.ac &&
        ((this.ac = 2),
        CycleCounter_1.CycleCounter.IsPassedStackCheck(this.JWa)) &&
        cpp_1.FKuroCycleCounter.StopCycleCounter();
  }
}
(Stat.EnableCreateWithStack = !0),
  (Stat.T9 = 5),
  (Stat.eQa = 0),
  (Stat.uth = new Stat("")),
  (Stat.m6 = Stat.CreateNoFlameGraph("Stat.Create")),
  (Stat.L9 = Stat.Create("Stat.CreateWithStack")),
  (Stat.P8 = Stat.Create("Stat.GetStack")),
  (Stat.Aoh = !0),
  (Stat.F8 = (t, e) => e),
  (Stat.V8 = { stack: void 0 }),
  __decorate([(0, Macro_1.MethodPruner)(0)], Stat.prototype, "Start", null),
  __decorate([(0, Macro_1.MethodPruner)(0)], Stat.prototype, "Stop", null),
  __decorate([(0, Macro_1.MethodPruner)(0)], Stat, "Create", null),
  __decorate([(0, Macro_1.MethodPruner)(0)], Stat, "CreateNoFlameGraph", null),
  __decorate([(0, Macro_1.MethodPruner)(0)], Stat, "CreateInstantStat", null),
  (exports.Stat = Stat),
  Log_1.Log.InitStat(Stat);
//# sourceMappingURL=Stats.js.map
