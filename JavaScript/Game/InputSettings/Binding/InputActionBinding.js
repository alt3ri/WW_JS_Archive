"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionBinding = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputSettings_1 = require("../InputSettings");
class InputActionBinding {
  constructor() {
    (this.ZMe = void 0),
      (this.Mne = 0),
      (this.Lo = void 0),
      (this.eSe = 0),
      (this.tSe = []),
      (this.iSe = []),
      (this.rSe = []);
  }
  Initialize(t) {
    (this.ZMe = t.ActionName),
      (this.Lo = t),
      (this.Mne = this.Lo.Id),
      (this.eSe = this.Lo.ActionType);
  }
  Clear() {
    (this.ZMe = void 0),
      (this.eSe = 0),
      (this.Lo = void 0),
      (this.tSe.length = 0),
      (this.iSe.length = 0),
      (this.rSe.length = 0);
  }
  GetActionName() {
    return this.ZMe;
  }
  GetInputActionKeyMap() {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe);
  }
  GetCurrentPlatformKeyByIndex(t) {
    var e = ModelManager_1.ModelManager.PlatformModel;
    return e.IsPc()
      ? this.GetPcKeyByIndex(t)
      : e.IsGamepad()
        ? this.GetGamepadKeyByIndex(t)
        : void 0;
  }
  GetCurrentPlatformKey() {
    var t = ModelManager_1.ModelManager.PlatformModel;
    return t.IsPc()
      ? this.GetPcKey()
      : t.IsGamepad()
        ? this.GetGamepadKey()
        : void 0;
  }
  GetPcKeyByIndex(t) {
    if (this.tSe && !(t >= this.tSe.length))
      return InputSettings_1.InputSettings.GetInputActionKey(
        this.ZMe,
        this.tSe[t],
      );
  }
  GetPcKey() {
    var t = this.tSe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetGamepadKeyByIndex(t) {
    if (this.iSe && !(t >= this.iSe.length))
      return InputSettings_1.InputSettings.GetInputActionKey(
        this.ZMe,
        this.iSe[t],
      );
  }
  GetGamepadKey() {
    var t = this.iSe[0];
    return InputSettings_1.InputSettings.GetKey(t);
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
  GetCurrentPlatformKeyNameList(t) {
    var e = ModelManager_1.ModelManager.PlatformModel;
    e.IsPc()
      ? this.GetPcKeyNameList(t)
      : e.IsGamepad() && this.GetGamepadKeyNameList(t);
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe).has(t);
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetActionMapping(this.ZMe, t),
      (this.rSe = t),
      this.nSe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.ZMe,
      );
  }
  RefreshKeysByActionMappings(e) {
    this.rSe.length = 0;
    for (let t = e.Num() - 1; 0 <= t; t--) {
      var i = e.Get(t).Key.KeyName.toString();
      this.rSe.push(i);
    }
    this.nSe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.ZMe,
      );
  }
  AddKeys(t) {
    for (const e of t)
      InputSettings_1.InputSettings.AddActionMapping(this.ZMe, e),
        this.rSe.push(e);
    this.nSe();
  }
  RemoveKeys(t) {
    for (const i of t) {
      InputSettings_1.InputSettings.RemoveActionMapping(this.ZMe, i);
      var e = this.rSe.indexOf(i);
      this.rSe.splice(e, 1);
    }
    this.nSe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveActionMappingByCondition(this.ZMe, t),
      this.nSe();
  }
  ClearAllKeys() {
    this.tSe && (this.tSe.length = 0),
      this.iSe && (this.iSe.length = 0),
      this.rSe && (this.rSe.length = 0),
      InputSettings_1.InputSettings.ClearActionMapping(this.ZMe);
  }
  GetActionMappingConfig() {
    return this.Lo;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetActionMappingType() {
    return this.eSe;
  }
  nSe() {
    if (
      (this.tSe && (this.tSe.length = 0),
      this.iSe && (this.iSe.length = 0),
      this.rSe)
    ) {
      this.rSe.sort((t, e) => {
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
      for (const e of this.rSe) {
        var t = InputSettings_1.InputSettings.GetKey(e);
        t &&
          (t.IsKeyboardKey || t.IsMouseButton
            ? this.tSe.push(e)
            : t.IsGamepadKey && this.iSe.push(e));
      }
    }
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map
