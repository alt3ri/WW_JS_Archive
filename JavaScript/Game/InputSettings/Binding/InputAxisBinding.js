"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputAxisBinding = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputSettings_1 = require("../InputSettings");
class InputAxisBinding {
  constructor() {
    (this.sEe = void 0),
      (this.Lo = void 0),
      (this.aEe = 0),
      (this.tEe = []),
      (this.iEe = []),
      (this.rEe = []);
  }
  Initialize(t) {
    (this.sEe = t.AxisName), (this.Lo = t), (this.aEe = this.Lo.AxisType);
  }
  Clear() {
    (this.sEe = void 0), (this.aEe = 0), (this.Lo = void 0);
  }
  GetAxisName() {
    return this.sEe;
  }
  GetInputAxisKeyMap() {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe);
  }
  GetCurrentPlatformKey() {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetPcKey()
      : Info_1.Info.IsInGamepad()
        ? this.GetGamepadKey()
        : void 0;
  }
  GetCurrentPlatformKeyNameList(t) {
    Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyNameList(t)
      : Info_1.Info.IsInGamepad() && this.GetGamepadKeyNameList(t);
  }
  GetCurrentPlatformKeyByIndex(t) {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyByIndex(t)
      : Info_1.Info.IsInGamepad()
        ? this.GetGamepadKeyByIndex(t)
        : void 0;
  }
  GetPcKeyByIndex(t) {
    if (!(t >= this.tEe.length))
      return InputSettings_1.InputSettings.GetInputAxisKey(
        this.sEe,
        this.tEe[t],
      );
  }
  GetPcKey() {
    for (const t of this.Lo.PcKeys.keys())
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t);
  }
  GetGamepadKeyByIndex(t) {
    if (!(t >= this.iEe.length))
      return InputSettings_1.InputSettings.GetInputAxisKey(
        this.sEe,
        this.iEe[t],
      );
  }
  GetGamepadKey() {
    for (const t of this.Lo.GamepadKeys.keys())
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t);
  }
  GetPcKeyNameList(t) {
    for (const e of this.tEe) t.push(e);
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iEe) t.push(e);
  }
  GetKeyNameList(t) {
    for (const e of this.rEe) t.push(e);
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe).has(t);
  }
  GetKey(t) {
    var e = [];
    for (const i of InputSettings_1.InputSettings.GetInputAxisKeyMap(
      this.sEe,
    ).values())
      i.Scale === t && e.push(i);
    return e;
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetAxisMapping(this.sEe, t),
      (this.rEe.length = 0);
    for (const e of t.keys()) this.rEe.push(e);
    this.nEe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.sEe,
      );
  }
  RefreshKeys(e) {
    this.rEe.length = 0;
    for (let t = e.Num() - 1; 0 <= t; t--) {
      var i = e.Get(t).Key.KeyName.toString();
      this.rEe.push(i);
    }
    this.nEe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.sEe,
      );
  }
  AddKeys(t) {
    for (var [e, i] of t)
      InputSettings_1.InputSettings.AddAxisMapping(this.sEe, e, i),
        this.rEe.push(e);
    this.nEe();
  }
  RemoveKeys(t) {
    for (const i of t) {
      InputSettings_1.InputSettings.RemoveAxisMapping(this.sEe, i);
      var e = this.rEe.indexOf(i);
      this.rEe.splice(e, 1);
    }
    this.nEe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveAxisMappingByCondition(this.sEe, t),
      this.nEe();
  }
  ClearAllKeys() {
    this.tEe && (this.tEe.length = 0),
      this.iEe && (this.iEe.length = 0),
      this.rEe && (this.rEe.length = 0),
      InputSettings_1.InputSettings.ClearAxisMapping(this.sEe);
  }
  GetAxisMappingConfig() {
    return this.Lo;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  nEe() {
    if (
      (this.tEe && (this.tEe.length = 0),
      this.iEe && (this.iEe.length = 0),
      this.rEe)
    ) {
      this.rEe.sort((t, e) => {
        var i =
          InputSettings_1.InputSettings.IsKeyboardKey(t) ||
          InputSettings_1.InputSettings.IsMouseButton(t);
        return i !==
          (InputSettings_1.InputSettings.IsKeyboardKey(e) ||
            InputSettings_1.InputSettings.IsMouseButton(e)) ||
          (i = InputSettings_1.InputSettings.IsGamepadKey(t)) !==
            InputSettings_1.InputSettings.IsGamepadKey(e)
          ? i
            ? -1
            : 1
          : 0;
      });
      for (const e of this.rEe) {
        var t = InputSettings_1.InputSettings.GetKey(e);
        t &&
          (t.IsKeyboardKey || t.IsMouseButton
            ? this.tEe.push(t.GetKeyName())
            : t.IsGamepadKey && this.iEe.push(e));
      }
    }
  }
}
exports.InputAxisBinding = InputAxisBinding;
//# sourceMappingURL=InputAxisBinding.js.map
