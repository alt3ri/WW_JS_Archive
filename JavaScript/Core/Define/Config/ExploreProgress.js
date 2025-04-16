"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgress = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreProgress {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Area() {
    return this.area();
  }
  get ExploreType() {
    return this.exploretype();
  }
  get SubTypeScore() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.subtypescoreLength(),
      this.subtypescoreKey,
      this.subtypescoreValue,
      this,
    );
  }
  subtypescoreKey(t) {
    return this.subtypescore(t)?.key();
  }
  subtypescoreValue(t) {
    return this.subtypescore(t)?.value();
  }
  get PhantomSkillId() {
    return this.phantomskillid();
  }
  get UnlockTextId() {
    return this.unlocktextid();
  }
  get LockTextId() {
    return this.locktextid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get SpecialPlayerMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.specialplayermapLength(),
      this.specialplayermapKey,
      this.specialplayermapValue,
      this,
    );
  }
  specialplayermapKey(t) {
    return this.specialplayermap(t)?.key();
  }
  specialplayermapValue(t) {
    return this.specialplayermap(t)?.value();
  }
  get IsRecommend() {
    return this.isrecommend();
  }
  get IsShowProgress() {
    return this.isshowprogress();
  }
  get IsShowTrack() {
    return this.isshowtrack();
  }
  get SpecialPlayerDesc() {
    return this.specialplayerdesc();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsExploreProgress(t, s) {
    return (s || new ExploreProgress()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  area() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  exploretype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSubtypescoreAt(t, s) {
    return this.subtypescore(t);
  }
  subtypescore(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    return e
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  subtypescoreLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  phantomskillid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlocktextid(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  locktextid(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSpecialplayermapAt(t, s) {
    return this.specialplayermap(t);
  }
  specialplayermap(t, s) {
    var e = this.J7.__offset(this.z7, 20);
    return e
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  specialplayermapLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  isrecommend() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshowprogress() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshowtrack() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  specialplayerdesc(t) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.ExploreProgress = ExploreProgress;
//# sourceMappingURL=ExploreProgress.js.map
