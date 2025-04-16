"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResTaskTheme = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class RogueResTaskTheme {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleImage() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.roleimageLength(),
      this.roleimage,
      this,
    );
  }
  get TabNames() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.tabnamesLength(),
      this.tabnamesKey,
      this.tabnamesValue,
      this,
    );
  }
  tabnamesKey(t) {
    return this.tabnames(t)?.key();
  }
  tabnamesValue(t) {
    return this.tabnames(t)?.value();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueResTaskTheme(t, e) {
    return (e || new RogueResTaskTheme()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRoleimageAt(t) {
    return this.roleimage(t);
  }
  roleimage(t) {
    var e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  roleimageLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  roleimageArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetTabnamesAt(t, e) {
    return this.tabnames(t);
  }
  tabnames(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    return s
      ? (e || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  tabnamesLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueResTaskTheme = RogueResTaskTheme;
//# sourceMappingURL=RogueResTaskTheme.js.map
