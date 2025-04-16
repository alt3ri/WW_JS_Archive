"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaViewInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  Vector_1 = require("./SubType/Vector");
class GachaViewInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SummaryTitle() {
    return this.summarytitle();
  }
  get SummaryDescribe() {
    return this.summarydescribe();
  }
  get ThemeColor() {
    return this.themecolor();
  }
  get EffectLocation() {
    return this.effectlocation();
  }
  get EffectPath() {
    return this.effectpath();
  }
  get TextTexture() {
    return this.texttexture();
  }
  get ContentTexturePath() {
    return this.contenttexturepath();
  }
  get ContentTextureBgPath() {
    return this.contenttexturebgpath();
  }
  get UnderBgTexturePath() {
    return this.underbgtexturepath();
  }
  get TagNotSelectedSpritePath() {
    return this.tagnotselectedspritepath();
  }
  get TagSelectedSpritePath() {
    return this.tagselectedspritepath();
  }
  get WeaponPrefabPath() {
    return this.weaponprefabpath();
  }
  get SpinePrefabResource() {
    return this.spineprefabresource();
  }
  get UpList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.uplistLength(),
      this.uplist,
      this,
    );
  }
  get ShowIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showidlistLength(),
      this.showidlist,
      this,
    );
  }
  get PreviewIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.previewidlistLength(),
      this.previewidlist,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGachaViewInfo(t, i) {
    return (i || new GachaViewInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  summarytitle(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  summarydescribe(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  themecolor(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  effectlocation(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + i),
          this.J7,
        )
      : null;
  }
  effectpath(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  texttexture(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  contenttexturepath(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  contenttexturebgpath(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  underbgtexturepath(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  tagnotselectedspritepath(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  tagselectedspritepath(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  weaponprefabpath(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  spineprefabresource(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetUplistAt(t) {
    return this.uplist(t);
  }
  uplist(t) {
    var i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  uplistLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  uplistArray() {
    var t = this.J7.__offset(this.z7, 34);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetShowidlistAt(t) {
    return this.showidlist(t);
  }
  showidlist(t) {
    var i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  showidlistLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showidlistArray() {
    var t = this.J7.__offset(this.z7, 36);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPreviewidlistAt(t) {
    return this.previewidlist(t);
  }
  previewidlist(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  previewidlistLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  previewidlistArray() {
    var t = this.J7.__offset(this.z7, 38);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.GachaViewInfo = GachaViewInfo;
//# sourceMappingURL=GachaViewInfo.js.map
