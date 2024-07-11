"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisBinding = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const InputSettings_1 = require("../InputSettings");
class InputCombinationAxisBinding {
  constructor() {
    (this.Mne = 0),
      (this.hSe = new Map()),
      (this.lSe = new Map()),
      (this.uSe = new Map()),
      (this.sSe = void 0),
      (this.Lo = void 0),
      (this.aSe = 0),
      (this.mSe = void 0);
  }
  Initialize(t) {
    (this.Mne = t.Id),
      (this.sSe = t.AxisName),
      (this.Lo = t),
      (this.aSe = this.Lo.AxisType),
      (this.mSe = this.Lo.SecondaryKeyScaleMap);
    for (const [i, s] of t.PcKeyMap) this.uSe.set(i, s);
    for (const [e, r] of t.GamepadKeyMap) this.uSe.set(e, r);
    this.dSe();
  }
  Clear() {
    (this.hSe = void 0),
      (this.lSe = void 0),
      (this.uSe = void 0),
      (this.sSe = void 0),
      (this.aSe = 0),
      (this.Lo = void 0);
  }
  dSe() {
    this.hSe.clear(), this.lSe.clear();
    for (const [t, i] of this.uSe) {
      const s = InputSettings_1.InputSettings.GetKey(i);
      s &&
        ((s.IsKeyboardKey || s.IsMouseButton) && this.hSe.set(t, i),
        s.IsGamepadKey) &&
        this.lSe.set(t, i);
    }
  }
  GetAxisName() {
    return this.sSe;
  }
  GetCombinationAxisKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sSe);
  }
  HasKeyboardCombinationAxis() {
    return !!this.hSe && this.hSe.size > 0;
  }
  HasGamepadCombinationAxis() {
    return !!this.lSe && this.lSe.size > 0;
  }
  GetAxisMappingType() {
    return this.aSe;
  }
  GetSourceAxisValue(t) {
    return this.mSe.get(t);
  }
  GetConfigId() {
    return this.Mne;
  }
  GetPcKeyNameMap(t) {
    for (const [i, s] of this.hSe) t.set(i, s);
  }
  GetGamepadKeyNameMap(t) {
    for (const [i, s] of this.lSe) t.set(i, s);
  }
  GetKeyMap(t) {
    for (const [i, s] of this.uSe) t.set(i, s);
  }
  GetCurrentPlatformKeyNameMap(t) {
    const i = ModelManager_1.ModelManager.PlatformModel;
    i.IsPc()
      ? this.GetPcKeyNameMap(t)
      : i.IsGamepad() && this.GetGamepadKeyNameMap(t);
  }
  HasKey(t, i) {
    return this.uSe.get(t) === i;
  }
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
// # sourceMappingURL=InputCombinationAxisBinding.js.map
