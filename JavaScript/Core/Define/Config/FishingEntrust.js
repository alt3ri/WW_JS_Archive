"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingEntrust = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntString_1 = require("./SubType/DicIntString");
class FishingEntrust {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get IsNight() {
    return this.isnight();
  }
  get Desc() {
    return this.desc();
  }
  get PreviewItem() {
    return this.previewitem();
  }
  get Star() {
    return this.star();
  }
  get EntrustType() {
    return this.entrusttype();
  }
  get EntrustPool() {
    return this.entrustpool();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get EntrustTarget() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.entrusttargetLength(),
      this.entrusttargetKey,
      this.entrusttargetValue,
      this,
    );
  }
  entrusttargetKey(t) {
    return this.entrusttarget(t)?.key();
  }
  entrusttargetValue(t) {
    return this.entrusttarget(t)?.value();
  }
  get EntrustDestination() {
    return this.entrustdestination();
  }
  get EntrustReward() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.entrustrewardLength(),
      this.entrustrewardKey,
      this.entrustrewardValue,
      this,
    );
  }
  entrustrewardKey(t) {
    return this.entrustreward(t)?.key();
  }
  entrustrewardValue(t) {
    return this.entrustreward(t)?.value();
  }
  get AccessPath() {
    return this.accesspath();
  }
  get TargetDesText() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.targetdestextLength(),
      this.targetdestextKey,
      this.targetdestextValue,
      this,
    );
  }
  targetdestextKey(t) {
    return this.targetdestext(t)?.key();
  }
  targetdestextValue(t) {
    return this.targetdestext(t)?.value();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFishingEntrust(t, s) {
    return (s || new FishingEntrust()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  isnight() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  previewitem() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  star() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entrusttype() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entrustpool() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetEntrusttargetAt(t, s) {
    return this.entrusttarget(t);
  }
  entrusttarget(t, s) {
    var r = this.J7.__offset(this.z7, 22);
    return r
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  entrusttargetLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  entrustdestination() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetEntrustrewardAt(t, s) {
    return this.entrustreward(t);
  }
  entrustreward(t, s) {
    var r = this.J7.__offset(this.z7, 26);
    return r
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  entrustrewardLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  accesspath() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTargetdestextAt(t, s) {
    return this.targetdestext(t);
  }
  targetdestext(t, s) {
    var r = this.J7.__offset(this.z7, 30);
    return r
      ? (s || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  targetdestextLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.FishingEntrust = FishingEntrust;
//# sourceMappingURL=FishingEntrust.js.map
