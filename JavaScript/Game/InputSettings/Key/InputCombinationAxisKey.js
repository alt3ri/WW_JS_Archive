"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisKey = void 0);
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const InputSettings_1 = require("../InputSettings");
class InputCombinationAxisKey {
  constructor() {
    (this.AxisName = ""),
      (this.MainKeyName = ""),
      (this.SecondaryKeyName = ""),
      (this.Scale = -0);
  }
  static New(t, e, i, n) {
    const s = new InputCombinationAxisKey();
    return (
      (s.AxisName = t),
      (s.MainKeyName = e),
      (s.SecondaryKeyName = i),
      (s.Scale = n),
      s
    );
  }
  GetMainKey() {
    return InputSettings_1.InputSettings.GetKey(this.MainKeyName);
  }
  GetSecondaryKey() {
    return InputSettings_1.InputSettings.GetKey(this.SecondaryKeyName);
  }
  MainKeyToUeInputActionKeyMapping() {
    const t = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, !1, !1, !1, !1, e);
  }
  SecondaryKeyToUeInputActionKeyMapping() {
    const t = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName);
    var e = new UE.Key(e);
    return new UE.InputAxisKeyMapping(t, this.Scale, e);
  }
}
exports.InputCombinationAxisKey = InputCombinationAxisKey;
// # sourceMappingURL=InputCombinationAxisKey.js.map
