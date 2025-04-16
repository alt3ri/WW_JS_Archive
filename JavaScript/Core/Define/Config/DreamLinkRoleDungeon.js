"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRoleDungeon = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicStringString_1 = require("./SubType/DicStringString");
class DreamLinkRoleDungeon {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get AnimationPath() {
    return this.animationpath();
  }
  get AddProgress() {
    return this.addprogress();
  }
  get IndexTexturePath() {
    return this.indextexturepath();
  }
  get WeaponShowConfig() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.weaponshowconfigLength(),
      this.weaponshowconfigKey,
      this.weaponshowconfigValue,
      this,
    );
  }
  weaponshowconfigKey(t) {
    return this.weaponshowconfig(t)?.key();
  }
  weaponshowconfigValue(t) {
    return this.weaponshowconfig(t)?.value();
  }
  get WeaponShowCase() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.weaponshowcaseLength(),
      this.weaponshowcaseKey,
      this.weaponshowcaseValue,
      this,
    );
  }
  weaponshowcaseKey(t) {
    return this.weaponshowcase(t)?.key();
  }
  weaponshowcaseValue(t) {
    return this.weaponshowcase(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDreamLinkRoleDungeon(t, i) {
    return (i || new DreamLinkRoleDungeon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  animationpath(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  addprogress() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  indextexturepath(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetWeaponshowconfigAt(t, i) {
    return this.weaponshowconfig(t);
  }
  weaponshowconfig(t, i) {
    var e = this.J7.__offset(this.z7, 14);
    return e
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  weaponshowconfigLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetWeaponshowcaseAt(t, i) {
    return this.weaponshowcase(t);
  }
  weaponshowcase(t, i) {
    var e = this.J7.__offset(this.z7, 16);
    return e
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  weaponshowcaseLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.DreamLinkRoleDungeon = DreamLinkRoleDungeon;
//# sourceMappingURL=DreamLinkRoleDungeon.js.map
