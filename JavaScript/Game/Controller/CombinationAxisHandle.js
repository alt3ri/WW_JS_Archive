"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombinationAxisHandle = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  Global_1 = require("../Global"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class CombinationAxisHandle {
  constructor() {
    (this.Hde = void 0),
      (this.PressMainKeyTimeStamp = 0),
      (this.Jde = void 0),
      (this.zde = !1),
      (this.M7a = new Set());
  }
  Clear() {
    this.Jde = void 0;
  }
  PressAnyKey(t) {
    this.Hde ||
      (InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(t)
        ? this.Xde(t)
        : (this.zde = !0));
  }
  ReleaseAnyKey(t) {
    this.Hde === t ? this.Yde() : (this.zde = !1);
  }
  Xde(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 10, "[Input]按下组合Axis主键", [
        "MainKeyName",
        t,
      ]),
      (this.Hde = t),
      (this.PressMainKeyTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (this.Jde =
        InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMapByMainKeyName(
          t,
        ));
  }
  Yde() {
    for (const e of this.Jde.values())
      for (const i of e) {
        var t = i.GetAxisName();
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
          t,
          0,
        );
      }
    (this.Jde = void 0), (this.Hde = void 0), (this.PressMainKeyTimeStamp = 0);
  }
  Tick(t) {
    if (!this.zde && this.Jde && !(this.Jde.size <= 0)) {
      var e = Global_1.Global.CharacterController;
      if (Info_1.Info.AxisInputOptimize) {
        this.M7a.clear();
        for (var [i, o] of this.Jde) {
          var s = InputSettings_1.InputSettings.GetUeKey(i),
            r = e.GetInputAnalogKeyState(s);
          for (const p of o) {
            var n,
              a = p.GetAxisName();
            a &&
              !this.M7a.has(a) &&
              (0 !== r && this.M7a.add(a),
              (n = r * p.GetSourceAxisValue(i)),
              ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
                a,
                n,
              ));
          }
        }
      } else
        for (var [l, h] of this.Jde) {
          var _ = InputSettings_1.InputSettings.GetUeKey(l),
            u = e.GetInputAnalogKeyState(_);
          for (const v of h) {
            var g = v.GetAxisName(),
              f = u * v.GetSourceAxisValue(l);
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
              g,
              f,
            );
          }
        }
    }
  }
}
exports.CombinationAxisHandle = CombinationAxisHandle;
//# sourceMappingURL=CombinationAxisHandle.js.map
