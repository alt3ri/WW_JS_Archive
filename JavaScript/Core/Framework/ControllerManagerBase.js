"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControllerManagerBase = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  TickSystem_1 = require("../Tick/TickSystem");
class ControllerManagerBase {
  constructor() {}
  static Add(r) {
    this.Controllers.set(r.name, r), r.SetControllerManager(this);
  }
  static Init() {
    for (const o of this.Controllers)
      try {
        o[1].Init() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器初始化失败，请往上查看具体出错模块日志解决问题",
              ["controller", o[0]],
            ));
      } catch (r) {
        r instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              1,
              "控制器初始化执行异常",
              r,
              ["error", r.message],
              ["controller", o[0]],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器初始化执行异常",
              ["error", r],
              ["controller", o[0]],
            );
      }
  }
  static Tick(r) {
    for (const t of this.TickControllers) {
      var o;
      (TickSystem_1.TickSystem.IsPaused && !t.IsTickEvenPaused) ||
        ((o = t.GetPerformanceStateObject()) && o.Start(),
        t.Tick(r),
        o && o.Stop());
    }
  }
  static AddTickController(r) {
    var o;
    this.TickControllers.push(r),
      Stats_1.Stat.Enable &&
        ((o = r.prototype.constructor.name), r.SetPerformanceStateObject(o));
  }
  static Clear() {
    for (const o of this.Controllers)
      try {
        o[1].Clear() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器清理失败，请往上查看具体出错模块日志解决问题",
              ["controller", o[0]],
            ));
      } catch (r) {
        r instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              1,
              "控制器清理执行异常",
              r,
              ["error", r.message],
              ["controller", o[0]],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器清理执行异常",
              ["error", r],
              ["controller", o[0]],
            );
      }
    this.OnClear() ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          1,
          "控制器系统清理失败，请往上查看具体出错模块日志解决问题",
        )),
      this.Controllers.clear(),
      this.TickControllers.splice(0, this.TickControllers.length);
  }
  static Preload() {
    var r = new Array();
    for (const t of this.Controllers) {
      var o = t[1].Preload();
      o && r.push(o);
    }
    return r;
  }
  static LeaveLevel() {
    for (const o of this.Controllers)
      try {
        o[1].LeaveLevel() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器退出关卡失败，请往上查看具体出错模块日志解决问题",
              ["controller", o[0]],
            ));
      } catch (r) {
        r instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              1,
              "控制器退出关卡执行异常",
              r,
              ["error", r.message],
              ["controller", o[0]],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器退出关卡执行异常",
              ["error", r],
              ["controller", o[0]],
            );
      }
    this.OnLeaveLevel() ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          1,
          "控制器退出关卡失败，请往上查看具体出错模块日志解决问题",
        ));
  }
  static ChangeMode() {
    for (const o of this.Controllers)
      try {
        o[1].ChangeMode() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              3,
              "控制器退出模式失败，请往上查看具体出错模块日志解决问题",
              ["controller", o[0]],
            ));
      } catch (r) {
        r instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              1,
              "控制器退出模式执行异常",
              r,
              ["error", r.message],
              ["controller", o[0]],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              1,
              "控制器退出模式执行异常",
              ["error", r],
              ["controller", o[0]],
            );
      }
    this.OnChangeMode() ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          3,
          "控制器退出模式失败，请往上查看具体出错模块日志解决问题",
        ));
  }
  static GetControllerByName(r) {
    return this.Controllers.get(r);
  }
  static OnClear() {
    return !0;
  }
  static OnLeaveLevel() {
    return !0;
  }
  static OnChangeMode() {
    return !0;
  }
}
((exports.ControllerManagerBase = ControllerManagerBase).Controllers =
  new Map()),
  (ControllerManagerBase.TickControllers = new Array());
//# sourceMappingURL=ControllerManagerBase.js.map
