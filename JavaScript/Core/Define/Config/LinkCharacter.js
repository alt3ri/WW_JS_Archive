"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkCharacter = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LinkCharacter {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get NeedLoadMesh() {
    return this.needloadmesh();
  }
  get CharacterDataAsset() {
    return this.characterdataasset();
  }
  get WeaponMeshList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.weaponmeshlistLength(),
      this.weaponmeshlist,
      this,
    );
  }
  get WeaponAnimList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.weaponanimlistLength(),
      this.weaponanimlist,
      this,
    );
  }
  get CompNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.compnamelistLength(),
      this.compnamelist,
      this,
    );
  }
  get RoleLinkAudio() {
    return this.rolelinkaudio();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsLinkCharacter(t, s) {
    return (s || new LinkCharacter()).__init(
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
  needloadmesh() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  characterdataasset(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetWeaponmeshlistAt(t) {
    return this.weaponmeshlist(t);
  }
  weaponmeshlist(t, s) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  weaponmeshlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetWeaponanimlistAt(t) {
    return this.weaponanimlist(t);
  }
  weaponanimlist(t, s) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  weaponanimlistLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetCompnamelistAt(t) {
    return this.compnamelist(t);
  }
  compnamelist(t, s) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  compnamelistLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rolelinkaudio(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.LinkCharacter = LinkCharacter;
//# sourceMappingURL=LinkCharacter.js.map
