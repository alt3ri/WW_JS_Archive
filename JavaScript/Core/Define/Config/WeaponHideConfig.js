"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponHideConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponHideConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get HideWeaponTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.hideweapontagsLength(),
      this.hideweapontags,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsWeaponHideConfig(t, i) {
    return (i || new WeaponHideConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetHideweapontagsAt(t) {
    return this.hideweapontags(t);
  }
  hideweapontags(t, i) {
    var e = this.J7.__offset(this.z7, 6);
    return e
      ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i)
      : null;
  }
  hideweapontagsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.WeaponHideConfig = WeaponHideConfig;
//# sourceMappingURL=WeaponHideConfig.js.map
