"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputCombinationAxisBinding_1 = require("../Binding/InputCombinationAxisBinding");
class InputCombinationAxisMapping {
  constructor() {
    (this.ZEe = new Map()), (this.eSe = new Map()), (this.zEe = new Set());
  }
  Initialize() {
    var i =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig();
    if (i) for (const n of i) this.tSe(n);
  }
  Clear() {
    for (const i of this.ZEe.values()) i.Clear();
    this.ZEe.clear(), this.eSe.clear();
  }
  tSe(i) {
    var n = i.AxisName,
      t = new InputCombinationAxisBinding_1.InputCombinationAxisBinding(),
      i = (t.Initialize(i), this.ZEe.set(n, t), new Map()),
      n = (t.GetPcKeyNameMap(i), new Map());
    t.GetGamepadKeyNameMap(n), this.iSe(t, i), this.iSe(t, n);
  }
  iSe(t, i) {
    for (var [e, a] of i) {
      let i = this.eSe.get(a),
        n = (i || ((i = new Map()), this.eSe.set(a, i)), i.get(e));
      n || ((n = []), i.set(e, n)),
        n.push(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Test",
            8,
            "[AddKeyMap]",
            ["mainKeyName", a],
            ["secondaryKeyName", e],
            ["MainKeySet", this.zEe],
          ),
        this.zEe.add(a);
    }
  }
  GetCombinationAxisBindingMapByMainKeyName(i) {
    return this.eSe.get(i);
  }
  GetCombinationAxisBindingByKeyName(i, n) {
    i = this.eSe.get(i);
    if (i) return i.get(n);
  }
  GetCombinationAxisBindingByActionName(i) {
    return this.ZEe.get(i);
  }
  IsMainKey(i) {
    return this.zEe.has(i);
  }
}
exports.InputCombinationAxisMapping = InputCombinationAxisMapping;
//# sourceMappingURL=InputCombinationAxisMapping.js.map
