"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControllerBase = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats");
class ControllerBase {
  constructor() {}
  static get IsTickEvenPaused() {
    return this.IsTickEvenPausedInternal;
  }
  static SetControllerManager(t) {
    this.Manager = t;
  }
  static Init() {
    return this.OnInit();
  }
  static Clear() {
    return (this.vK = !0), this.OnClear();
  }
  static PauseTick() {
    this.vDe = !1;
  }
  static ResumeTick() {
    this.vDe = !0;
  }
  static InitTickOptimize(t = 1, e = 1) {
    (this.TickInterval = t), (this.TickIntervalInFight = e), (this.Xyl = !1);
  }
  static get vDe() {
    return this.Yyl;
  }
  static set vDe(t) {
    this.Yyl !== t &&
      ((this.Yyl = t), (this.Xyl = !1), (this.zyl = 0), (this.Jyl = 0));
  }
  static CheckTick(t, e) {
    if (!this.Xyl) {
      if (!this.vDe) return !1;
      if (t) {
        if (this.TickIntervalInFight < 0) return !1;
        if ((this.zyl++, (this.Jyl += e), this.TickIntervalInFight > this.zyl))
          return !1;
      } else {
        if (this.TickInterval < 0) return !1;
        if ((this.zyl++, (this.Jyl += e), this.TickInterval > this.zyl))
          return !1;
      }
      this.zyl = 0;
    }
    return !0;
  }
  static Tick(e) {
    if (!this.vK) {
      let t = e;
      0 !== this.Jyl && ((t = this.Jyl), (this.Jyl = 0));
      try {
        this.OnTick(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Controller",
              3,
              "Tick方法执行异常",
              t,
              ["name", this.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Controller",
              3,
              "Tick方法执行异常",
              ["name", this.name],
              ["error", t],
            );
      }
    }
  }
  static AfterTick(t) {
    this.vK || this.OnAfterTick(t);
  }
  static Preload() {
    return this.OnPreload();
  }
  static LeaveLevel() {
    return this.OnLeaveLevel();
  }
  static ChangeMode() {
    return this.OnChangeMode();
  }
  static SetPerformanceStateObject(t, e = "", i = "") {
    this.PerformanceState = Stats_1.Stat.CreateNoFlameGraph(t, e, i);
  }
  static GetPerformanceStateObject() {
    return this.OnGetPerformanceStateObject();
  }
  static OnInit() {
    return !0;
  }
  static OnTick(t) {}
  static OnAfterTick(t) {}
  static OnClear() {
    return !0;
  }
  static OnPreload() {}
  static OnLeaveLevel() {
    return !0;
  }
  static OnGetPerformanceStateObject() {
    return this.PerformanceState;
  }
  static OnChangeMode() {
    return !0;
  }
}
((exports.ControllerBase = ControllerBase).Manager = void 0),
  (ControllerBase.PerformanceState = void 0),
  (ControllerBase.IsTickEvenPausedInternal = !1),
  (ControllerBase.vK = !1),
  (ControllerBase.Xyl = !0),
  (ControllerBase.Yyl = !0),
  (ControllerBase.TickIntervalInFight = 1),
  (ControllerBase.TickInterval = 1),
  (ControllerBase.zyl = 0),
  (ControllerBase.Jyl = 0);
//# sourceMappingURL=ControllerBase.js.map
