"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionMapping = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputActionBinding_1 = require("../Binding/InputActionBinding");
class InputActionMapping {
  constructor() {
    (this.WSe = new Map()), (this.KSe = new Map()), (this.QSe = new Map());
  }
  Initialize() {
    const t =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig();
    if (t) for (const n of t) this.NewActionBinding(n);
  }
  Clear() {
    for (const t of this.WSe.values()) t.Clear();
    this.WSe.clear(), this.KSe.clear(), this.QSe.clear();
  }
  NewActionBinding(t) {
    var n = t.ActionName;
    const i = new InputActionBinding_1.InputActionBinding();
    var t = (i.Initialize(t), i.GetConfigId());
    var n = (this.WSe.set(n, i), this.KSe.set(t, i), i.GetActionMappingType());
    let e = this.QSe.get(n);
    e || ((e = new Set()), this.QSe.set(n, e)), e.add(i);
  }
  RemoveActionBinding(t) {
    let n;
    let i;
    const e = this.WSe.get(t);
    e &&
      ((n = e.GetConfigId()),
      (i = e.GetActionMappingType()),
      this.QSe.get(i)?.delete(e),
      this.WSe.delete(t),
      this.KSe.delete(n),
      e.Clear());
  }
  ClearAllActionKeys() {
    for (const t of this.WSe.values()) t.ClearAllKeys();
  }
  GetActionBinding(t) {
    return this.WSe.get(t);
  }
  GetActionBindingByConfigId(t) {
    return this.KSe.get(t);
  }
  GetActionBindingByActionMappingType(t) {
    return this.QSe.get(t);
  }
  SetKeys(t, n) {
    const i = this.WSe.get(t);
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
    const i = this.WSe.get(t);
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
    const i = this.WSe.get(t);
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
    const i = this.WSe.get(t);
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
    const i = this.WSe.get(t);
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
// # sourceMappingURL=InputActionMapping.js.map
