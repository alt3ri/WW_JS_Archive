"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputAxisBinding_1 = require("../Binding/InputAxisBinding");
class InputAxisMapping {
  constructor() {
    (this.XSe = new Map()), (this.$Se = new Map());
  }
  Initialize() {
    var e =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig();
    if (e) for (const i of e) this.NewAxisBinding(i);
  }
  Clear() {
    for (const e of this.XSe.values()) e.Clear();
    this.XSe.clear(), this.$Se.clear();
  }
  NewAxisBinding(e) {
    var i = e.AxisName,
      t = new InputAxisBinding_1.InputAxisBinding(),
      e = (t.Initialize(e), this.XSe.set(i, t), t.GetAxisMappingType());
    let n = this.$Se.get(e);
    n || ((n = new Set()), this.$Se.set(e, n)), n.add(t);
  }
  RemoveAxisBinding(e) {
    var i,
      t = this.XSe.get(e);
    t &&
      ((i = t.GetAxisMappingType()),
      this.$Se.get(i)?.delete(t),
      this.XSe.delete(e),
      t.Clear());
  }
  ClearAllAxisKeys() {
    for (const e of this.XSe.values()) e.ClearAllKeys();
  }
  GetAxisBinding(e) {
    return this.XSe.get(e);
  }
  GetAxisBindingByAxisMappingType(e) {
    return this.$Se.get(e);
  }
  SetKeys(e, i) {
    var t = this.XSe.get(e);
    t
      ? (t.SetKeys(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedAxisKeys,
          e,
          t,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "设置Axis按键时，找不到对应Axis", [
          "AxisName",
          e,
        ]);
  }
  RefreshKeys(e, i) {
    var t = this.XSe.get(e);
    t
      ? (t.RefreshKeys(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedAxisKeys,
          e,
          t,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "设置Axis按键时，找不到对应Axis", [
          "AxisName",
          e,
        ]);
  }
  AddKeys(e, i) {
    var t = this.XSe.get(e);
    t
      ? (t.AddKeys(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedAxisKeys,
          e,
          t,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "添加Axis按键时，找不到对应Axis", [
          "AxisName",
          e,
        ]);
  }
  RemoveKeys(e, i) {
    var t = this.XSe.get(e);
    t
      ? (t.RemoveKeys(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedAxisKeys,
          e,
          t,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("InputSettings", 8, "删除Axis按键时，找不到对应Axis", [
          "AxisName",
          e,
        ]);
  }
  RemoveKeysByCondition(e, i) {
    var t = this.XSe.get(e);
    t
      ? (t.RemoveKeysByCondition(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangedAxisKeys,
          e,
          t,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "InputSettings",
          8,
          "删除Axis中符合条件的按键映射，找不到对应Axis",
          ["AxisName", e],
        );
  }
}
exports.InputAxisMapping = InputAxisMapping;
//# sourceMappingURL=InputAxisMapping.js.map
