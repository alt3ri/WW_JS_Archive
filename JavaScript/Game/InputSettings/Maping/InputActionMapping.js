"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputActionBinding_1 = require("../Binding/InputActionBinding");
class InputActionMapping {
  constructor() {
    (this.WEe = new Map()), (this.KEe = new Map()), (this.QEe = new Map());
  }
  Initialize() {
    var t =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig();
    if (t) for (const n of t) this.NewActionBinding(n);
  }
  Clear() {
    for (const t of this.WEe.values()) t.Clear();
    this.WEe.clear(), this.KEe.clear(), this.QEe.clear();
  }
  NewActionBinding(t) {
    var n = t.ActionName,
      i = new InputActionBinding_1.InputActionBinding(),
      t = (i.Initialize(t), i.GetConfigId()),
      n = (this.WEe.set(n, i), this.KEe.set(t, i), i.GetActionMappingType());
    let e = this.QEe.get(n);
    e || ((e = new Set()), this.QEe.set(n, e)), e.add(i);
  }
  RemoveActionBinding(t) {
    var n,
      i,
      e = this.WEe.get(t);
    e &&
      ((n = e.GetConfigId()),
      (i = e.GetActionMappingType()),
      this.QEe.get(i)?.delete(e),
      this.WEe.delete(t),
      this.KEe.delete(n),
      e.Clear());
  }
  ClearAllActionKeys() {
    for (const t of this.WEe.values()) t.ClearAllKeys();
  }
  GetActionBinding(t) {
    return this.WEe.get(t);
  }
  GetActionBindingByConfigId(t) {
    return this.KEe.get(t);
  }
  GetActionBindingByActionMappingType(t) {
    return this.QEe.get(t);
  }
  SetKeys(t, n) {
    var i = this.WEe.get(t);
    i
      ? (i.SetKeys(n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedActionKeys,
          t,
          i,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "InputSettings",
          8,
          "设置Action按键时，找不到对应Action",
          ["ActionName", t],
        );
  }
  RefreshKeysByActionMappings(t, n) {
    var i = this.WEe.get(t);
    i
      ? (i.RefreshKeysByActionMappings(n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedActionKeys,
          t,
          i,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "InputSettings",
          8,
          "设置Action按键时，找不到对应Action",
          ["ActionName", t],
        );
  }
  AddKeys(t, n) {
    var i = this.WEe.get(t);
    i
      ? (i.AddKeys(n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedActionKeys,
          t,
          i,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "添加Action按键，找不到对应Action", [
          "ActionName",
          t,
        ]);
  }
  RemoveKeys(t, n) {
    var i = this.WEe.get(t);
    i
      ? (i.RemoveKeys(n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedActionKeys,
          t,
          i,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "删除Action按键，找不到对应Action", [
          "ActionName",
          t,
        ]);
  }
  RemoveKeysByCondition(t, n) {
    var i = this.WEe.get(t);
    i
      ? (i.RemoveKeysByCondition(n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedActionKeys,
          t,
          i,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "InputSettings",
          8,
          "删除Action中符合条件的按键映射，找不到对应Action",
          ["ActionName", t],
        );
  }
}
exports.InputActionMapping = InputActionMapping;
//# sourceMappingURL=InputActionMapping.js.map
