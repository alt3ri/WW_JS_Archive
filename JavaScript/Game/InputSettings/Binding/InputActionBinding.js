"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionBinding = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputSettings_1 = require("../InputSettings"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputSettingsManager_1 = require("../InputSettingsManager");
class InputActionBinding {
  constructor() {
    (this.ZMe = void 0),
      (this.Mne = 0),
      (this.Lo = void 0),
      (this.eEe = 0),
      (this.tEe = []),
      (this.iEe = []),
      (this.rEe = []);
  }
  Initialize(t) {
    (this.ZMe = t.ActionName),
      (this.Lo = t),
      (this.Mne = this.Lo.Id),
      (this.eEe = this.Lo.ActionType);
  }
  Clear() {
    (this.ZMe = void 0),
      (this.eEe = 0),
      (this.Lo = void 0),
      (this.tEe.length = 0),
      (this.iEe.length = 0),
      (this.rEe.length = 0);
  }
  GetActionName() {
    return this.ZMe;
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
    for (const i of this.tEe) t.push(i);
  }
  GetGamepadKeyNameList(t) {
    for (const i of this.iEe) t.push(i);
  }
  GetKeyNameList(t) {
    for (const i of this.rEe) t.push(i);
  }
  GetCurrentPlatformKeyNameList(t) {
    Info_1.Info.IsInKeyBoard()
      ? this.GetPcKeyNameList(t)
      : Info_1.Info.IsInGamepad() && this.GetGamepadKeyNameList(t);
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe).has(t);
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
  RefreshKeysByActionMappings(i) {
    this.rEe.length = 0;
    for (let t = i.Num() - 1; 0 <= t; t--) {
      var e = i.Get(t).Key.KeyName.toString();
      this.rEe.push(e);
    }
    this.nEe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.ZMe,
      );
  }
  AddKeys(t) {
    for (const i of t)
      InputSettings_1.InputSettings.AddActionMapping(this.ZMe, i),
        this.rEe.push(i);
    this.nEe();
  }
  RemoveKeys(t) {
    for (const e of t) {
      InputSettings_1.InputSettings.RemoveActionMapping(this.ZMe, e);
      var i = this.rEe.indexOf(e);
      this.rEe.splice(i, 1);
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
    ) {
      var t =
        ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(
          this.ZMe,
        );
      let n = [];
      (n = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard
        ? t.FrancePcKeys
        : t.PcKeys),
        this.rEe.sort((t, i) => {
          var e =
              InputSettings_1.InputSettings.IsKeyboardKey(t) ||
              InputSettings_1.InputSettings.IsMouseButton(t),
            s =
              InputSettings_1.InputSettings.IsKeyboardKey(i) ||
              InputSettings_1.InputSettings.IsMouseButton(i);
          return e !== s
            ? e
              ? -1
              : 1
            : (e === s) == !0
              ? n.indexOf(t) < n.indexOf(i)
                ? -1
                : 1
              : (e = InputSettings_1.InputSettings.IsGamepadKey(t)) !==
                  InputSettings_1.InputSettings.IsGamepadKey(i)
                ? e
                  ? -1
                  : 1
                : 0;
        });
      for (const e of this.rEe) {
        var i = InputSettings_1.InputSettings.GetKey(e);
        i &&
          (i.IsKeyboardKey || i.IsMouseButton
            ? this.tEe.push(e)
            : i.IsGamepadKey && this.iEe.push(e));
      }
    }
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map
