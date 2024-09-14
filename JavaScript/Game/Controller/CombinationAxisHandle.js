"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombinationAxisHandle = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  Global_1 = require("../Global"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
class CombinationAxisHandle {
  constructor() {
    (this.Hde = void 0),
      (this.PressMainKeyTimeStamp = 0),
      (this.Jde = void 0),
      (this.zde = !1),
      (this.B8a = new Set());
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
      Log_1.Log.Info("InputSettings", 8, "[Input]按下组合Axis主键", [
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
    for (const i of this.Jde.values())
      for (const e of i) {
        var t = e.GetAxisName();
        InputDistributeController_1.InputDistributeController.InputAxis(t, 0);
      }
    (this.Jde = void 0), (this.Hde = void 0), (this.PressMainKeyTimeStamp = 0);
  }
  Tick(t) {
    if (!this.zde && this.Jde && !(this.Jde.size <= 0)) {
      var i = Global_1.Global.CharacterController;
      if (Info_1.Info.AxisInputOptimize) {
        this.B8a.clear();
        for (var [e, s] of this.Jde) {
          var n = InputSettings_1.InputSettings.GetUeKey(e),
            o = i.GetInputAnalogKeyState(n);
          for (const g of s) {
            var r,
              u = g.GetAxisName();
            u &&
              !this.B8a.has(u) &&
              (0 !== o && this.B8a.add(u),
              (r = o * g.GetSourceAxisValue(e)),
              InputDistributeController_1.InputDistributeController.InputAxis(
                u,
                r,
              ));
          }
        }
      } else
        for (var [a, l] of this.Jde) {
          var h = InputSettings_1.InputSettings.GetUeKey(a),
            _ = i.GetInputAnalogKeyState(h);
          for (const f of l) {
            var p = f.GetAxisName(),
              I = _ * f.GetSourceAxisValue(a);
            InputDistributeController_1.InputDistributeController.InputAxis(
              p,
              I,
            );
          }
        }
    }
  }
}
exports.CombinationAxisHandle = CombinationAxisHandle;
//# sourceMappingURL=CombinationAxisHandle.js.map
