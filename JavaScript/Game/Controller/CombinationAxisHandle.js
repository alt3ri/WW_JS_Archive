"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombinationAxisHandle = void 0);
const Log_1 = require("../../Core/Common/Log");
const TimeUtil_1 = require("../Common/TimeUtil");
const Global_1 = require("../Global");
const InputSettings_1 = require("../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../InputSettings/InputSettingsManager");
const InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
class CombinationAxisHandle {
  constructor() {
    (this.Hde = void 0),
      (this.PressMainKeyTimeStamp = 0),
      (this.Jde = void 0),
      (this.zde = !1);
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
        const t = e.GetAxisName();
        InputDistributeController_1.InputDistributeController.InputAxis(t, 0);
      }
    (this.Jde = void 0), (this.Hde = void 0), (this.PressMainKeyTimeStamp = 0);
  }
  Tick(t) {
    if (!this.zde && this.Jde && !(this.Jde.size <= 0)) {
      let i;
      let e;
      const s = Global_1.Global.CharacterController;
      for ([i, e] of this.Jde) {
        const n = InputSettings_1.InputSettings.GetUeKey(i);
        const r = s.GetInputAnalogKeyState(n);
        for (const a of e) {
          const o = a.GetAxisName();
          const u = r * a.GetSourceAxisValue(i);
          InputDistributeController_1.InputDistributeController.InputAxis(o, u);
        }
      }
    }
  }
}
exports.CombinationAxisHandle = CombinationAxisHandle;
// # sourceMappingURL=CombinationAxisHandle.js.map
