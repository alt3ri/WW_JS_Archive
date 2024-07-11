"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputCombinationAxisBinding_1 = require("../Binding/InputCombinationAxisBinding");
class InputCombinationAxisMapping {
  constructor() {
    (this.ZSe = new Map()), (this.eEe = new Map()), (this.zSe = new Set());
  }
  Initialize() {
    var i =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig();
    if (i) for (const n of i) this.tEe(n);
  }
  Clear() {
    for (const i of this.ZSe.values()) i.Clear();
    this.ZSe.clear(), this.eEe.clear();
  }
  tEe(i) {
    var n = i.AxisName,
      t = new InputCombinationAxisBinding_1.InputCombinationAxisBinding(),
      i = (t.Initialize(i), this.ZSe.set(n, t), new Map()),
      n = (t.GetPcKeyNameMap(i), new Map());
    t.GetGamepadKeyNameMap(n), this.iEe(t, i), this.iEe(t, n);
  }
  iEe(t, i) {
    for (var [e, a] of i) {
      let i = this.eEe.get(a),
        n = (i || ((i = new Map()), this.eEe.set(a, i)), i.get(e));
      n || ((n = []), i.set(e, n)),
        n.push(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Test",
            8,
            "[AddKeyMap]",
            ["mainKeyName", a],
            ["secondaryKeyName", e],
            ["MainKeySet", this.zSe],
          ),
        this.zSe.add(a);
    }
  }
  GetCombinationAxisBindingMapByMainKeyName(i) {
    return this.eEe.get(i);
  }
  GetCombinationAxisBindingByKeyName(i, n) {
    i = this.eEe.get(i);
    if (i) return i.get(n);
  }
  GetCombinationAxisBindingByActionName(i) {
    return this.ZSe.get(i);
  }
  IsMainKey(i) {
    return this.zSe.has(i);
  }
}
exports.InputCombinationAxisMapping = InputCombinationAxisMapping;
//# sourceMappingURL=InputCombinationAxisMapping.js.map
