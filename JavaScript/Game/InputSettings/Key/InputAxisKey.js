"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputAxisKey = void 0);
const UE = require("ue"),
  InputSettings_1 = require("../InputSettings");
class InputAxisKey {
  constructor() {
    (this.AxisName = ""), (this.Scale = -0), (this.KeyName = "");
  }
  static New(t, e, s) {
    var n = new InputAxisKey();
    return (n.AxisName = t), (n.Scale = e), (n.KeyName = s), n;
  }
  static NewByInputAxisKeyMapping(t) {
    var e = new InputAxisKey();
    return (
      (e.AxisName = t.AxisName.toString()),
      (e.Scale = t.Scale),
      (e.KeyName = t.Key.KeyName.toString()),
      e
    );
  }
  ToUeInputAxisKeyMapping() {
    var t = new UE.FName(this.AxisName),
      e = new UE.FName(this.KeyName),
      e = new UE.Key(e);
    return new UE.InputAxisKeyMapping(t, this.Scale, e);
  }
  GetKey() {
    return InputSettings_1.InputSettings.GetKey(this.KeyName);
  }
  GetKeyIconPath() {
    return this.GetKey()?.GetKeyIconPath() ?? "";
  }
  IsEqual(t) {
    return (
      this.AxisName === t.AxisName.toString() &&
      this.KeyName === t.Key.KeyName.toString() &&
      this.Scale === t.Scale
    );
  }
}
exports.InputAxisKey = InputAxisKey;
//# sourceMappingURL=InputAxisKey.js.map
