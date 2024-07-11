"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionKey = void 0);
const UE = require("ue");
const InputSettings_1 = require("../InputSettings");
class InputActionKey {
  constructor() {
    (this.ActionName = ""),
      (this.IsAlt = !1),
      (this.IsCmd = !1),
      (this.IsCtrl = !1),
      (this.IsShift = !1),
      (this.KeyName = "");
  }
  static New(t, e, i, s, n, r) {
    const u = new InputActionKey();
    return (
      (u.ActionName = t),
      (u.IsShift = e),
      (u.IsCtrl = i),
      (u.IsAlt = s),
      (u.IsCmd = n),
      (u.KeyName = r),
      u
    );
  }
  static NewByInputActionKeyMapping(t) {
    const e = new InputActionKey();
    return (
      (e.ActionName = t.ActionName.toString()),
      (e.IsShift = t.bShift),
      (e.IsCtrl = t.bCtrl),
      (e.IsAlt = t.bAlt),
      (e.IsCmd = t.bCmd),
      (e.KeyName = t.Key.KeyName.toString()),
      e
    );
  }
  ToUeInputActionKeyMapping() {
    const t = new UE.FName(this.ActionName);
    var e = new UE.FName(this.KeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(
      t,
      this.IsShift,
      this.IsCtrl,
      this.IsAlt,
      this.IsCmd,
      e,
    );
  }
  GetKey() {
    return InputSettings_1.InputSettings.GetKey(this.KeyName);
  }
  GetKeyIconPath() {
    return this.GetKey()?.GetKeyIconPath() ?? "";
  }
  IsEqual(t) {
    return (
      this.ActionName === t.ActionName.toString() &&
      this.KeyName === t.Key.KeyName.toString() &&
      this.IsAlt === t.bAlt &&
      this.IsCmd === t.bCmd &&
      this.IsCtrl === t.bCtrl &&
      this.IsShift === t.bShift
    );
  }
}
exports.InputActionKey = InputActionKey;
// # sourceMappingURL=InputActionKey.js.map
