"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationActionKey = void 0);
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const InputSettings_1 = require("../InputSettings");
class InputCombinationActionKey {
  constructor() {
    (this.ActionName = ""),
      (this.MainKeyName = ""),
      (this.SecondaryKeyName = "");
  }
  static New(t, e, n) {
    const i = new InputCombinationActionKey();
    return (i.ActionName = t), (i.MainKeyName = e), (i.SecondaryKeyName = n), i;
  }
  GetMainKey() {
    return InputSettings_1.InputSettings.GetKey(this.MainKeyName);
  }
  GetSecondaryKey() {
    return InputSettings_1.InputSettings.GetKey(this.SecondaryKeyName);
  }
  MainKeyToUeInputActionKeyMapping() {
    const t = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, !1, !1, !1, !1, e);
  }
  SecondaryKeyToUeInputActionKeyMapping() {
    const t = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, !1, !1, !1, !1, e);
  }
}
exports.InputCombinationActionKey = InputCombinationActionKey;
// # sourceMappingURL=InputCombinationActionKey.js.map
