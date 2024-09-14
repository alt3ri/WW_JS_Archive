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
      (this.S0r = [126]),
      (this.y0r = [46, 60, 126, 97, 143, 145, 136, 134, 138, 146]),
      (this.I0r = [56, 60, 145]),
      !0
    );
  }
  static RegisterPreTick(o, e) {
    this.T0r(o)
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
    this.L0r(o)
      ? this.D0r.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            32,
            "[ComponentForceTickController.RegisterTick] 当前Comp已经注册过ForceTick",
            ["Comp", o.toString()],
          )
        : this.D0r.set(o, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          32,
          "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static RegisterAfterTick(o, e) {
    this.R0r(o)
      ? this._It.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            32,
            "[ComponentForceTickController.RegisterAfterTick] 当前Comp已经注册过ForceAfterTick",
            ["Comp", o.toString()],
          )
        : this._It.set(o, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          32,
          "[ComponentForceTickController.RegisterAfterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static UnregisterTick(o) {
    this.D0r.has(o)
      ? this.D0r.delete(o)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TickController",
          32,
          "[ComponentForceTickController.UnregisterTick] 当前Comp未注册过ForceTick",
          ["Comp", o.toString()],
        );
  }
  static UnregisterAfterTick(o) {
    this._It.has(o)
      ? this._It.delete(o)
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
    for (var [e, r] of this.D0r)
      if (e.Active)
        try {
          var t = this.m6(
            this.U0r,
            e.constructor.name,
            "ComponentForceTickController.OnTick.",
          );
          t?.Start(), r(o * this.SW), t?.Stop();
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
    for (var [e, r] of this._It)
      try {
        var t;
        e.Active &&
          ((t = this.m6(
            this.A0r,
            e.constructor.name,
            "ComponentForceTickController.OnAfterTick.",
          ))?.Start(),
          r(o * this.SW),
          t?.Stop());
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
  static T0r(e) {
    return Boolean(
      this.S0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static L0r(e) {
    return Boolean(
      this.y0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static R0r(e) {
    return Boolean(
      this.I0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(e, o)),
    );
  }
  static m6(e, r, t) {
    if (Stats_1.Stat.Enable) {
      let o = e.get(r);
      return o || ((o = Stats_1.Stat.Create(t + r)), e.set(r, o)), o;
    }
  }
  static SetTimeDilation(o) {
    ComponentForceTickController.SW = o;
  }
}
((exports.ComponentForceTickController = ComponentForceTickController).y0r =
  []),
  (ComponentForceTickController.I0r = []),
  (ComponentForceTickController.S0r = []),
  (ComponentForceTickController.U0r = new Map()),
  (ComponentForceTickController.A0r = new Map()),
  (ComponentForceTickController.SW = 1),
  (ComponentForceTickController.D0r = new Map()),
  (ComponentForceTickController._It = new Map());
//# sourceMappingURL=ComponentForceTickController.js.map
