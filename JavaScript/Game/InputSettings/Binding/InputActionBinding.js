"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionBinding = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputSettings_1 = require("../InputSettings"),
  InputSettingsManager_1 = require("../InputSettingsManager");
class InputActionBinding {
  constructor() {
    (this.ZMe = void 0),
      (this.Mne = 0),
      (this.Lo = void 0),
      (this.eEe = 0),
      (this.tEe = []),
      (this.iEe = []),
      (this.rEe = []),
      (this.JXa = 0),
      (this.ZXa = 0);
  }
  Initialize(t) {
    (this.ZMe = t.ActionName),
      (this.Lo = t),
      (this.Mne = this.Lo.Id),
      (this.eEe = this.Lo.ActionType),
      (this.JXa = t.KeyboardVersion),
      (this.ZXa = t.GamepadVersion);
  }
  Clear() {
    (this.ZMe = void 0),
      (this.eEe = 0),
      (this.Lo = void 0),
      (this.tEe.length = 0),
      (this.iEe.length = 0),
      (this.rEe.length = 0),
      (this.JXa = 0),
      (this.ZXa = 0);
  }
  GetActionName() {
    return this.ZMe;
  }
  SetKeyboardVersion(t) {
    this.JXa = t;
  }
  GetKeyboardVersion() {
    return this.JXa;
  }
  SetGamepadVersion(t) {
    this.ZXa = t;
  }
  GetGamepadVersion() {
    return this.ZXa;
  }
  GetInputActionKeyMap() {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe);
  }
  GetCurrentPlatformKeyByIndex(t) {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyByIndex(t)
      : Info_1.Info.IsInGamepad()
        ? this.GetGamepadKeyByIndex(t)
        : void 0;
  }
  GetCurrentPlatformKey() {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetPcKey()
      : Info_1.Info.IsInGamepad()
        ? this.GetGamepadKey()
        : void 0;
  }
  GetPcKeyByIndex(t) {
    if (this.tEe && !(t >= this.tEe.length))
      return InputSettings_1.InputSettings.GetInputActionKey(
        this.ZMe,
        this.tEe[t],
      );
  }
  GetPcKey() {
    var t = this.tEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetGamepadKeyByIndex(t) {
    if (this.iEe && !(t >= this.iEe.length))
      return InputSettings_1.InputSettings.GetInputActionKey(
        this.ZMe,
        this.iEe[t],
      );
  }
  GetGamepadKey() {
    var t = this.iEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetPcKeyNameList(t) {
    for (const e of this.tEe) t.push(e);
  }
  GetPcKeyNameListReadonly() {
    return this.tEe;
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iEe) t.push(e);
  }
  GetGamepadKeyNameListReadonly() {
    return this.iEe;
  }
  GetKeyNameList(t) {
    for (const e of this.rEe) t.push(e);
  }
  GetCurrentPlatformKeyNameList(t) {
    Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyNameList(t)
      : Info_1.Info.IsInGamepad() && this.GetGamepadKeyNameList(t);
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe).has(t);
  }
  HasAnyKey() {
    return 0 < this.rEe.length;
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetActionMapping(this.ZMe, t),
      (this.rEe = t),
      this.nEe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.ZMe,
      );
  }
  SetKeyboardKeys(t) {
    t = t.concat(this.iEe);
    this.SetKeys(t);
  }
  SetGamepadKeys(t) {
    t = this.tEe.concat(t);
    this.SetKeys(t);
  }
  RefreshKeysByActionMappings(e) {
    this.rEe.length = 0;
    for (let t = e.Num() - 1; 0 <= t; t--) {
      var i = e.Get(t).Key.KeyName.toString();
      this.rEe.push(i);
    }
    this.nEe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.ZMe,
      );
  }
  AddKeys(t) {
    for (const e of t)
      InputSettings_1.InputSettings.AddActionMapping(this.ZMe, e),
        this.rEe.push(e);
    this.nEe();
  }
  RemoveKeys(t) {
    for (const i of t) {
      InputSettings_1.InputSettings.RemoveActionMapping(this.ZMe, i);
      var e = this.rEe.indexOf(i);
      this.rEe.splice(e, 1);
    }
    this.nEe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveActionMappingByCondition(this.ZMe, t),
      this.nEe();
  }
  ClearAllKeys() {
    this.tEe && (this.tEe.length = 0),
      this.iEe && (this.iEe.length = 0),
      this.rEe && (this.rEe.length = 0),
      InputSettings_1.InputSettings.ClearActionMapping(this.ZMe);
  }
  GetActionMappingConfig() {
    return this.Lo;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetActionMappingType() {
    return this.eEe;
  }
  nEe() {
    if (
      (this.tEe && (this.tEe.length = 0),
      this.iEe && (this.iEe.length = 0),
      this.rEe)
    )
      for (const e of this.rEe) {
        var t = InputSettings_1.InputSettings.GetKey(e);
        t &&
          (t.IsKeyboardKey || t.IsMouseButton
            ? this.tEe.push(e)
            : t.IsGamepadKey && this.iEe.push(e));
      }
  }
  ConvertSort() {
    var t =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(
        this.ZMe,
      );
    let n = [];
    (n = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard
      ? t.FrancePcKeys
      : t.PcKeys),
      this.rEe.sort((t, e) => {
        var i =
            InputSettings_1.InputSettings.IsKeyboardKey(t) ||
            InputSettings_1.InputSettings.IsMouseButton(t),
          s =
            InputSettings_1.InputSettings.IsKeyboardKey(e) ||
            InputSettings_1.InputSettings.IsMouseButton(e);
        if (i !== s) return i ? -1 : 1;
        if (i === s) {
          (i = n.indexOf(t)), (s = n.indexOf(e));
          if (-1 !== i && -1 !== s) return i < s ? -1 : 1;
        }
        i = InputSettings_1.InputSettings.IsGamepadKey(t);
        return i !== InputSettings_1.InputSettings.IsGamepadKey(e)
          ? i
            ? -1
            : 1
          : 0;
      }),
      this.SetKeys(this.rEe);
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map
