"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationActionBinding = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  InputSettings_1 = require("../InputSettings");
class InputCombinationActionBinding {
  constructor() {
    (this.hSe = new Map()),
      (this.lSe = new Map()),
      (this.uSe = new Map()),
      (this.cSe = -0),
      (this.ZMe = void 0);
  }
  Initialize(t, i) {
    (this.ZMe = t), (this.cSe = i);
  }
  Clear() {
    (this.hSe = void 0),
      (this.lSe = void 0),
      (this.uSe = void 0),
      (this.ZMe = void 0);
  }
  AddKey(t, i) {
    this.uSe.set(t, i);
    var e = InputSettings_1.InputSettings.GetKey(t);
    e &&
      ((e.IsKeyboardKey || e.IsMouseButton) && this.hSe.set(t, i),
      e.IsGamepadKey) &&
      this.lSe.set(t, i);
  }
  RemoveKey(t) {
    this.uSe.delete(t), this.hSe.delete(t), this.lSe.delete(t);
  }
  GetKeyMap(t) {
    for (var [i, e] of this.uSe) t.set(i, e);
  }
  IsValid() {
    return !!this.uSe && 0 < this.uSe.size;
  }
  GetActionName() {
    return this.ZMe;
  }
  GetCombinationActionKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationActionKeyMap(this.ZMe);
  }
  HasKeyboardCombinationAction() {
    return !!this.hSe && 0 < this.hSe.size;
  }
  HasGamepadCombinationAction() {
    return !!this.lSe && 0 < this.lSe.size;
  }
  GetSecondaryKeyValidTime() {
    return this.cSe;
  }
  GetPcKeyNameMap(t) {
    for (var [i, e] of this.hSe) t.set(i, e);
  }
  GetGamepadKeyNameMap(t) {
    for (var [i, e] of this.lSe) t.set(i, e);
  }
  GetCurrentPlatformKeyNameMap(t) {
    var i = ModelManager_1.ModelManager.PlatformModel;
    i.IsPc()
      ? this.GetPcKeyNameMap(t)
      : i.IsGamepad() && this.GetGamepadKeyNameMap(t);
  }
  HasKey(t, i) {
    return this.uSe.get(t) === i;
  }
}
exports.InputCombinationActionBinding = InputCombinationActionBinding;
//# sourceMappingURL=InputCombinationActionBinding.js.map
