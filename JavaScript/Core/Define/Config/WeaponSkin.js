"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkin = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponSkin {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get WeaponSkinType() {
    return this.weaponskintype();
  }
  get Name() {
    return this.name();
  }
  get HideInSkinView() {
    return this.hideinskinview();
  }
  get QualityId() {
    return this.qualityid();
  }
  get ModelId() {
    return this.modelid();
  }
  get TransformId() {
    return this.transformid();
  }
  get Models() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.modelsLength(),
      this.models,
      this,
    );
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get CardIconPath() {
    return this.cardiconpath();
  }
  get Icon() {
    return this.icon();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get Mesh() {
    return this.mesh();
  }
  get MaxCapcity() {
    return this.maxcapcity();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.itemaccessLength(),
      this.itemaccess,
      this,
    );
  }
  get ObtainedShow() {
    return this.obtainedshow();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get NumLimit() {
    return this.numlimit();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get HiddenTime() {
    return this.hiddentime();
  }
  get Destructible() {
    return this.destructible();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsWeaponSkin(t, i) {
    return (i || new WeaponSkin()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weaponskintype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  hideinskinview() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  modelid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  transformid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetModelsAt(t) {
    return this.models(t);
  }
  models(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  modelsLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  modelsArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  cardiconpath(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  maxcapcity() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 99;
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 38);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  obtainedshow() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  numlimit() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 46);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hiddentime() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.readFloat32(this.z7 + t) : 10;
  }
  destructible() {
    var t = this.J7.__offset(this.z7, 52);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 54);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.WeaponSkin = WeaponSkin;
//# sourceMappingURL=WeaponSkin.js.map
