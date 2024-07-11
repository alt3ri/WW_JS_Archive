"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationAxisKey = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  InputSettings_1 = require("../InputSettings");
class InputCombinationAxisKey {
  constructor() {
    (this.AxisName = ""),
      (this.MainKeyName = ""),
      (this.SecondaryKeyName = ""),
      (this.Scale = -0);
  }
  static New(t, e, i, n) {
    var s = new InputCombinationAxisKey();
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
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName),
      e = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName),
      e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, !1, !1, !1, !1, e);
  }
  SecondaryKeyToUeInputActionKeyMapping() {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName),
      e = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName),
      e = new UE.Key(e);
    return new UE.InputAxisKeyMapping(t, this.Scale, e);
  }
}
exports.InputCombinationAxisKey = InputCombinationAxisKey;
//# sourceMappingURL=InputCombinationAxisKey.js.map
