"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActionMapping = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ActionMapping {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActionName() {
    return this.actionname();
  }
  get ActionType() {
    return this.actiontype();
  }
  get PcKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.pckeysLength(),
      this.pckeys,
      this,
    );
  }
  get FrancePcKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.francepckeysLength(),
      this.francepckeys,
      this,
    );
  }
  get GamepadKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.gamepadkeysLength(),
      this.gamepadkeys,
      this,
    );
  }
  get MobileIconPath() {
    return this.mobileiconpath();
  }
  get DisplayName() {
    return this.displayname();
  }
  get IsIdleAction() {
    return this.isidleaction();
  }
  get KeyboardVersion() {
    return this.keyboardversion();
  }
  get GamepadVersion() {
    return this.gamepadversion();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsActionMapping(t, i) {
    return (i || new ActionMapping()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  actionname(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  actiontype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPckeysAt(t) {
    return this.pckeys(t);
  }
  pckeys(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  pckeysLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetFrancepckeysAt(t) {
    return this.francepckeys(t);
  }
  francepckeys(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  francepckeysLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetGamepadkeysAt(t) {
    return this.gamepadkeys(t);
  }
  gamepadkeys(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  gamepadkeysLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mobileiconpath(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  displayname(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  isidleaction() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  keyboardversion() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gamepadversion() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ActionMapping = ActionMapping;
//# sourceMappingURL=ActionMapping.js.map
