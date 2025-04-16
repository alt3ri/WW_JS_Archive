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
      (this.S0r = [137]),
      (this.y0r = [52, 67, 137, 104, 154, 156, 147, 145, 149, 157, 215]),
      (this.I0r = [63, 67, 156]),
      !0
    );
  }
  static RegisterPreMoveTick(o, r) {
    this.T0r(o)
      ? this.Eq_.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            35,
            "[ComponentForceTickController.RegisterPreMoveTick] 当前Comp已经注册过ForceTick",
            ["Comp", o.toString()],
          )
        : this.Eq_.set(o, r)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          35,
          "[ComponentForceTickController.RegisterPreMoveTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static RegisterPreTick(o, r) {
    this.T0r(o)
      ? Core_1.Core.RegisterPreTick(r)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          31,
          "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static UnregisterPreTick(o) {
    Core_1.Core.UnRegisterPreTick(o);
  }
  static RegisterTick(o, r) {
    this.L0r(o)
      ? this.D0r.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            31,
            "[ComponentForceTickController.RegisterTick] 当前Comp已经注册过ForceTick",
            ["Comp", o.toString()],
          )
        : this.D0r.set(o, r)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          31,
          "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static RegisterAfterTick(o, r) {
    this.R0r(o)
      ? this._It.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TickController",
            31,
            "[ComponentForceTickController.RegisterAfterTick] 当前Comp已经注册过ForceAfterTick",
            ["Comp", o.toString()],
          )
        : this._It.set(o, r)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TickController",
          31,
          "[ComponentForceTickController.RegisterAfterTick] 当前Comp不允许注册到ForceTickController",
          ["Comp", o.toString()],
        );
  }
  static UnregisterPreMoveTick(o) {
    this.Eq_.has(o)
      ? this.Eq_.delete(o)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TickController",
          35,
          "[ComponentForceTickController.UnregisterPreTick] 当前Comp未注册过",
          ["Comp", o.toString()],
        );
  }
  static UnregisterTick(o) {
    this.D0r.has(o)
      ? this.D0r.delete(o)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TickController",
          31,
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
          31,
          "[ComponentForceTickController.UnregisterAfterTick] 当前Comp未注册过ForceAfterTick",
          ["Comp", o.toString()],
        );
  }
  static MoveTickPriority1(o) {
    for (var [r, e] of this.Eq_)
      if (r.Active)
        try {
          var t = this.m6(
            this.Iq_,
            r.constructor.name,
            "ComponentForceTickController.PreMoveTick",
          );
          t?.Start(), e(o * this.SW), t?.Stop();
        } catch (o) {
          o instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "TickController",
                35,
                "处理方法执行异常",
                o,
                ["comp", r.toString()],
                ["error", o.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TickController",
                35,
                "处理方法执行异常",
                ["comp", r.toString()],
                ["error", o],
              );
        }
  }
  static OnTick(o) {
    for (var [r, e] of this.D0r)
      if (r.Active)
        try {
          var t = this.m6(
            this.U0r,
            r.constructor.name,
            "ComponentForceTickController.OnTick.",
          );
          t?.Start(), e(o * this.SW), t?.Stop();
        } catch (o) {
          o instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "TickController",
                31,
                "处理方法执行异常",
                o,
                ["comp", r.toString()],
                ["error", o.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TickController",
                31,
                "处理方法执行异常",
                ["comp", r.toString()],
                ["error", o],
              );
        }
  }
  static OnAfterTick(o) {
    for (var [r, e] of this._It)
      try {
        var t;
        r.Active &&
          ((t = this.m6(
            this.A0r,
            r.constructor.name,
            "ComponentForceTickController.OnAfterTick.",
          ))?.Start(),
          e(o * this.SW),
          t?.Stop());
      } catch (o) {
        o instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "TickController",
              31,
              "处理方法执行异常",
              o,
              ["comp", r.toString()],
              ["error", o.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TickController",
              31,
              "处理方法执行异常",
              ["comp", r.toString()],
              ["error", o],
            );
      }
  }
  static T0r(r) {
    return Boolean(
      this.S0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(r, o)),
    );
  }
  static L0r(r) {
    return Boolean(
      this.y0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(r, o)),
    );
  }
  static R0r(r) {
    return Boolean(
      this.I0r.find((o) => (0, RegisterComponent_1.isComponentInstance)(r, o)),
    );
  }
  static m6(r, e, t) {
    if (Stats_1.Stat.Enable) {
      let o = r.get(e);
      return (
        o || ((o = Stats_1.Stat.CreateNoFlameGraph(t + e)), r.set(e, o)), o
      );
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
  (ComponentForceTickController.Iq_ = new Map()),
  (ComponentForceTickController.U0r = new Map()),
  (ComponentForceTickController.A0r = new Map()),
  (ComponentForceTickController.SW = 1),
  (ComponentForceTickController.Eq_ = new Map()),
  (ComponentForceTickController.D0r = new Map()),
  (ComponentForceTickController._It = new Map());
//# sourceMappingURL=ComponentForceTickController.js.map
