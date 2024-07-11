"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputAxisBinding = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputSettings_1 = require("../InputSettings");
class InputAxisBinding {
  constructor() {
    (this.sSe = void 0),
      (this.Lo = void 0),
      (this.aSe = 0),
      (this.tSe = []),
      (this.iSe = []),
      (this.rSe = []);
  }
  Initialize(t) {
    (this.sSe = t.AxisName), (this.Lo = t), (this.aSe = this.Lo.AxisType);
  }
  Clear() {
    (this.sSe = void 0), (this.aSe = 0), (this.Lo = void 0);
  }
  GetAxisName() {
    return this.sSe;
  }
  GetInputAxisKeyMap() {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sSe);
  }
  GetCurrentPlatformKey() {
    const t = ModelManager_1.ModelManager.PlatformModel;
    return t.IsPc()
      ? this.GetPcKey()
      : t.IsGamepad()
        ? this.GetGamepadKey()
        : void 0;
  }
  GetCurrentPlatformKeyNameList(t) {
    const e = ModelManager_1.ModelManager.PlatformModel;
    e.IsPc()
      ? this.GetPcKeyNameList(t)
      : e.IsGamepad() && this.GetGamepadKeyNameList(t);
  }
  GetCurrentPlatformKeyByIndex(t) {
    const e = ModelManager_1.ModelManager.PlatformModel;
    return e.IsPc()
      ? this.GetPcKeyByIndex(t)
      : e.IsGamepad()
        ? this.GetGamepadKeyByIndex(t)
        : void 0;
  }
  GetPcKeyByIndex(t) {
    if (!(t >= this.tSe.length))
      return InputSettings_1.InputSettings.GetInputAxisKey(
        this.sSe,
        this.tSe[t],
      );
  }
  GetPcKey() {
    for (const t of this.Lo.PcKeys.keys())
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sSe, t);
  }
  GetGamepadKeyByIndex(t) {
    if (!(t >= this.iSe.length))
      return InputSettings_1.InputSettings.GetInputAxisKey(
        this.sSe,
        this.iSe[t],
      );
  }
  GetGamepadKey() {
    for (const t of this.Lo.GamepadKeys.keys())
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sSe, t);
  }
  GetPcKeyNameList(t) {
    for (const e of this.tSe) t.push(e);
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iSe) t.push(e);
  }
  GetKeyNameList(t) {
    for (const e of this.rSe) t.push(e);
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sSe).has(t);
  }
  GetKey(t) {
    const e = [];
    for (const i of InputSettings_1.InputSettings.GetInputAxisKeyMap(
      this.sSe,
    ).values())
      i.Scale === t && e.push(i);
    return e;
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetAxisMapping(this.sSe, t),
      (this.rSe.length = 0);
    for (const e of t.keys()) this.rSe.push(e);
    this.nSe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.sSe,
      );
  }
  RefreshKeys(e) {
    this.rSe.length = 0;
    for (let t = e.Num() - 1; t >= 0; t--) {
      const i = e.Get(t).Key.KeyName.toString();
      this.rSe.push(i);
    }
    this.nSe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.sSe,
      );
  }
  AddKeys(t) {
    for (const [e, i] of t)
      InputSettings_1.InputSettings.AddAxisMapping(this.sSe, e, i),
        this.rSe.push(e);
    this.nSe();
  }
  RemoveKeys(t) {
    for (const i of t) {
      InputSettings_1.InputSettings.RemoveAxisMapping(this.sSe, i);
      const e = this.rSe.indexOf(i);
      this.rSe.splice(e, 1);
    }
    this.nSe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveAxisMappingByCondition(this.sSe, t),
      this.nSe();
  }
  ClearAllKeys() {
    this.tSe && (this.tSe.length = 0),
      this.iSe && (this.iSe.length = 0),
      this.rSe && (this.rSe.length = 0),
      InputSettings_1.InputSettings.ClearAxisMapping(this.sSe);
  }
  GetAxisMappingConfig() {
    return this.Lo;
  }
  GetAxisMappingType() {
    return this.aSe;
  }
  nSe() {
    if (
      (this.tSe && (this.tSe.length = 0),
      this.iSe && (this.iSe.length = 0),
      this.rSe)
    ) {
      this.rSe.sort((t, e) => {
        let i =
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
      for (const e of this.rSe) {
        const t = InputSettings_1.InputSettings.GetKey(e);
        t &&
          (t.IsKeyboardKey || t.IsMouseButton
            ? this.tSe.push(t.GetKeyName())
            : t.IsGamepadKey && this.iSe.push(e));
      }
    }
  }
}
exports.InputAxisBinding = InputAxisBinding;
// # sourceMappingURL=InputAxisBinding.js.map
