"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastThemeConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BlackCoastThemeConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get ItemId() {
    return this.itemid();
  }
  get WeaponPreviewId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.weaponpreviewidLength(),
      this.weaponpreviewid,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsBlackCoastThemeConfig(t, i) {
    return (i || new BlackCoastThemeConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetWeaponpreviewidAt(t) {
    return this.weaponpreviewid(t);
  }
  weaponpreviewid(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  weaponpreviewidLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  weaponpreviewidArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.BlackCoastThemeConfig = BlackCoastThemeConfig;
//# sourceMappingURL=BlackCoastThemeConfig.js.map
