"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationActionBinding = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  InputSettings_1 = require("../InputSettings");
class InputCombinationActionBinding {
  constructor() {
    (this.hEe = new Map()),
      (this.lEe = new Map()),
      (this.uEe = new Map()),
      (this.cEe = -0),
      (this.ZMe = void 0);
  }
  Initialize(t, i) {
    (this.ZMe = t), (this.cEe = i);
  }
  Clear() {
    (this.hEe = void 0),
      (this.lEe = void 0),
      (this.uEe = void 0),
      (this.ZMe = void 0);
  }
  AddKey(t, i) {
    this.uEe.set(t, i);
    var e = InputSettings_1.InputSettings.GetKey(t);
    e &&
      ((e.IsKeyboardKey || e.IsMouseButton) && this.hEe.set(t, i),
      e.IsGamepadKey) &&
      this.lEe.set(t, i);
  }
  RemoveKey(t) {
    this.uEe.delete(t), this.hEe.delete(t), this.lEe.delete(t);
  }
  GetKeyMap(t) {
    for (var [i, e] of this.uEe) t.set(i, e);
  }
  IsValid() {
    return !!this.uEe && 0 < this.uEe.size;
  }
  GetActionName() {
    return this.ZMe;
  }
  GetCombinationActionKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationActionKeyMap(this.ZMe);
  }
  HasKeyboardCombinationAction() {
    return !!this.hEe && 0 < this.hEe.size;
  }
  HasGamepadCombinationAction() {
    return !!this.lEe && 0 < this.lEe.size;
  }
  GetSecondaryKeyValidTime() {
    return this.cEe;
  }
  GetPcKeyNameMap(t) {
    for (var [i, e] of this.hEe) t.set(i, e);
  }
  GetGamepadKeyNameMap(t) {
    for (var [i, e] of this.lEe) t.set(i, e);
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
exports.InputCombinationActionBinding = InputCombinationActionBinding;
//# sourceMappingURL=InputCombinationActionBinding.js.map
