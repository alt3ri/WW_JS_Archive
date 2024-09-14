"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InputCombinationAxisBinding_1 = require("../Binding/InputCombinationAxisBinding");
class InputCombinationAxisMapping {
  constructor() {
    (this.ZEe = new Map()), (this.eSe = new Map()), (this.zEe = new Set());
  }
  Clear() {
    for (const i of this.ZEe.values()) i.Clear();
    this.ZEe.clear(), this.eSe.clear();
  }
  NewCombinationAxisBinding(i) {
    var n = i.AxisName,
      t = new InputCombinationAxisBinding_1.InputCombinationAxisBinding(),
      i = (t.Initialize(i), this.ZEe.set(n, t), new Map()),
      n = (t.GetPcKeyNameMap(i), new Map());
    t.GetGamepadKeyNameMap(n), this.AddKeyMap(t, i), this.AddKeyMap(t, n);
  }
  AddKeyMap(t, i) {
    for (var [e, s] of i) {
      let i = this.eSe.get(s),
        n = (i || ((i = new Map()), this.eSe.set(s, i)), i.get(e));
      n || ((n = []), i.set(e, n)),
        n.push(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Test",
            8,
            "[AddKeyMap]",
            ["mainKeyName", s],
            ["secondaryKeyName", e],
            ["MainKeySet", this.zEe],
          ),
        this.zEe.add(s);
    }
  }
  GetCombinationAxisBindingMapByMainKeyName(i) {
    return this.eSe.get(i);
  }
  GetCombinationAxisBindingByKeyName(i, n) {
    i = this.eSe.get(i);
    if (i) return i.get(n);
  }
  GetCombinationAxisBindingByAxisName(i) {
    return this.ZEe.get(i);
  }
  GetCombinationAxisBindingMap() {
    return this.ZEe;
  }
  IsMainKey(i) {
    return this.zEe.has(i);
  }
}
exports.InputCombinationAxisMapping = InputCombinationAxisMapping;
//# sourceMappingURL=InputCombinationAxisMapping.js.map
