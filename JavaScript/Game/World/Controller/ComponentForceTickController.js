"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentForceTickController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Core_1 = require("../../../Core/Core"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class ComponentForceTickController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.Tgr = [123]),
      (this.Lgr = [44, 57, 123, 94, 140, 142, 133, 131, 135, 143]),
      (this.Dgr = [54, 57, 142]),
      !0
    );
  }
  static RegisterPreTick(o, e) {
    this.Rgr(o)
      ? Core_1.Core.RegisterPreTick(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          32,
          "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static RegisterTick(o, e) {
    this.Ugr(o)
      ? this.Agr.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            32,
            "[ComponentForceTickController.RegisterTick] 当前Comp已经注册过ForceTick",
            ["Comp", o.toString()],
          )
        : this.Agr.set(o, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          32,
          "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static RegisterAfterTick(o, e) {
    this.Pgr(o)
      ? this.ZEt.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            32,
            "[ComponentForceTickController.RegisterAfterTick] 当前Comp已经注册过ForceAfterTick",
            ["Comp", o.toString()],
          )
        : this.ZEt.set(o, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          32,
          "[ComponentForceTickController.RegisterAfterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static UnregisterTick(o) {
    this.Agr.has(o)
      ? this.Agr.delete(o)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TickController",
          32,
          "[ComponentForceTickController.UnregisterTick] 当前Comp未注册过ForceTick",
          ["Comp", o.toString()],
        );
  }
  static UnregisterAfterTick(o) {
    this.ZEt.has(o)
      ? this.ZEt.delete(o)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TickController",
          32,
          "[ComponentForceTickController.UnregisterAfterTick] 当前Comp未注册过ForceAfterTick",
          ["Comp", o.toString()],
        );
  }
  static UnregisterPreTick(o) {
    Core_1.Core.UnRegisterPreTick(o);
  }
  static OnTick(o) {
    for (var [e, r] of this.Agr)
      if (e.Active)
        try {
          this.m6(
            this.xgr,
            e.constructor.name,
            "ComponentForceTickController.OnTick.",
          );
          r(o * this.EW);
        } catch (o) {
          o instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "TickController",
                32,
                "处理方法执行异常",
                o,
                ["comp", e.toString()],
                ["error", o.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TickController",
                32,
                "处理方法执行异常",
                ["comp", e.toString()],
                ["error", o],
              );
        }
  }
  static OnAfterTick(o) {
    for (var [e, r] of this.ZEt)
      try {
        e.Active &&
          (this.m6(
            this.wgr,
            e.constructor.name,
            "ComponentForceTickController.OnAfterTick.",
          ),
          r(o * this.EW));
      } catch (o) {
        o instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "TickController",
              32,
              "处理方法执行异常",
              o,
              ["comp", e.toString()],
              ["error", o.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TickController",
              32,
              "处理方法执行异常",
              ["comp", e.toString()],
              ["error", o],
            );
      }
  }
  static Rgr(e) {
    return Boolean(
      this.Tgr.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static Ugr(e) {
    return Boolean(
      this.Lgr.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static Pgr(e) {
    return Boolean(
      this.Dgr.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static m6(e, r, o) {
    if (Stats_1.Stat.Enable) {
      let o = e.get(r);
      return o || ((o = void 0), e.set(r, o)), o;
    }
  }
  static SetTimeDilation(o) {
    ComponentForceTickController.EW = o;
  }
}
((exports.ComponentForceTickController = ComponentForceTickController).Lgr =
  []),
  (ComponentForceTickController.Dgr = []),
  (ComponentForceTickController.Tgr = []),
  (ComponentForceTickController.xgr = new Map()),
  (ComponentForceTickController.wgr = new Map()),
  (ComponentForceTickController.EW = 1),
  (ComponentForceTickController.Agr = new Map()),
  (ComponentForceTickController.ZEt = new Map());
//# sourceMappingURL=ComponentForceTickController.js.map
