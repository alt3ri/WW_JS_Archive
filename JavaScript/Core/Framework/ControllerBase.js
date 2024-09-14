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
  static Tick(t) {
    if (!this.vK)
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
  static SetPerformanceStateObject(t, e = "", r = "") {
    this.PerformanceState = Stats_1.Stat.Create(t, e, r);
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
  (ControllerBase.vK = !1);
//# sourceMappingURL=ControllerBase.js.map
