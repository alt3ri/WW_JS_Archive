"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisBinding = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  InputSettings_1 = require("../InputSettings");
class InputCombinationAxisBinding {
  constructor() {
    (this.Mne = 0),
      (this.hEe = new Map()),
      (this.lEe = new Map()),
      (this.uEe = new Map()),
      (this.sEe = void 0),
      (this.Lo = void 0),
      (this.aEe = 0),
      (this.mEe = void 0);
  }
  Initialize(t) {
    (this.Mne = t.Id),
      (this.sEe = t.AxisName),
      (this.Lo = t),
      (this.aEe = this.Lo.AxisType),
      (this.mEe = this.Lo.SecondaryKeyScaleMap);
    for (var [i, s] of t.PcKeyMap) this.uEe.set(i, s);
    for (var [e, o] of t.GamepadKeyMap) this.uEe.set(e, o);
    this.dEe();
  }
  Clear() {
    (this.hEe = void 0),
      (this.lEe = void 0),
      (this.uEe = void 0),
      (this.sEe = void 0),
      (this.aEe = 0),
      (this.Lo = void 0);
  }
  dEe() {
    this.hEe.clear(), this.lEe.clear();
    for (var [t, i] of this.uEe) {
      var s = InputSettings_1.InputSettings.GetKey(i);
      s &&
        ((s.IsKeyboardKey || s.IsMouseButton) && this.hEe.set(t, i),
        s.IsGamepadKey) &&
        this.lEe.set(t, i);
    }
  }
  GetAxisName() {
    return this.sEe;
  }
  GetCombinationAxisKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sEe);
  }
  HasKeyboardCombinationAxis() {
    return !!this.hEe && 0 < this.hEe.size;
  }
  HasGamepadCombinationAxis() {
    return !!this.lEe && 0 < this.lEe.size;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  GetSourceAxisValue(t) {
    return this.mEe.get(t);
  }
  GetConfigId() {
    return this.Mne;
  }
  GetPcKeyNameMap(t) {
    for (var [i, s] of this.hEe) t.set(i, s);
  }
  GetGamepadKeyNameMap(t) {
    for (var [i, s] of this.lEe) t.set(i, s);
  }
  GetKeyMap(t) {
    for (var [i, s] of this.uEe) t.set(i, s);
  }
  GetCurrentPlatformKeyNameMap(t) {
    Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyNameMap(t)
      : Info_1.Info.IsInGamepad() && this.GetGamepadKeyNameMap(t);
  }
  HasKey(t, i) {
    return this.uEe.get(t) === i;
  }
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
//# sourceMappingURL=InputCombinationAxisBinding.js.map
