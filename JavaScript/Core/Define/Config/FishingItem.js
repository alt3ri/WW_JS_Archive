"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  IntArray_1 = require("./SubType/IntArray");
class FishingItem {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Category() {
    return this.category();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get Pic() {
    return this.pic();
  }
  get Icon() {
    return this.icon();
  }
  get Shap() {
    return this.shap();
  }
  get Quality() {
    return this.quality();
  }
  get Tech() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.techLength(),
      this.tech,
      this,
    );
  }
  get Price() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.priceLength(),
      this.price,
      this,
    );
  }
  get SizeWeight() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.sizeweightLength(),
      this.sizeweight,
      this,
    );
  }
  get Relation() {
    return this.relation();
  }
  get ChildRelation() {
    return this.childrelation();
  }
  get ConvertItem() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.convertitemLength(),
      this.convertitemKey,
      this.convertitemValue,
      this,
    );
  }
  convertitemKey(t) {
    return this.convertitem(t)?.key();
  }
  convertitemValue(t) {
    return this.convertitem(t)?.value();
  }
  get CanDelete() {
    return this.candelete();
  }
  get DetectionUnlockCondition() {
    return this.detectionunlockcondition();
  }
  get Area() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.areaLength(),
      this.area,
      this,
    );
  }
  get Time() {
    return this.time();
  }
  get Color() {
    return this.color();
  }
  get Sprite() {
    return this.sprite();
  }
  get IllustratedNum() {
    return this.illustratednum();
  }
  get Reputation() {
    return this.reputation();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingItem(t, i) {
    return (i || new FishingItem()).__init(
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
  category() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  pic(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  shap() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  quality() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  GetTechAt(t) {
    return this.tech(t);
  }
  tech(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  techLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  techArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPriceAt(t) {
    return this.price(t);
  }
  price(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  priceLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  priceArray() {
    var t = this.J7.__offset(this.z7, 24);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetSizeweightAt(t, i) {
    return this.sizeweight(t);
  }
  sizeweight(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    return s
      ? (i || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  sizeweightLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  relation() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  childrelation() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConvertitemAt(t, i) {
    return this.convertitem(t);
  }
  convertitem(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  convertitemLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  candelete() {
    var t = this.J7.__offset(this.z7, 34);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  detectionunlockcondition() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetAreaAt(t) {
    return this.area(t);
  }
  area(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  areaLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  areaArray() {
    var t = this.J7.__offset(this.z7, 38);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  time() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  color(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sprite(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  illustratednum() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reputation() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingItem = FishingItem;
//# sourceMappingURL=FishingItem.js.map
