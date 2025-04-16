"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Influence = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntPair_1 = require("./SubType/IntPair");
class Influence {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get Introduction() {
    return this.introduction();
  }
  get ExtraDesc() {
    return this.extradesc();
  }
  get ShowIcon() {
    return this.showicon();
  }
  get Logo() {
    return this.logo();
  }
  get DailyTaskShow() {
    return this.dailytaskshow();
  }
  get RawRelation() {
    return this.rawrelation();
  }
  get RelationCondition() {
    return this.relationcondition();
  }
  get LastRelation() {
    return this.lastrelation();
  }
  get ReputationMax() {
    return this.reputationmax();
  }
  get ReputationItem() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.reputationitemLength(),
      this.reputationitem,
      this,
    );
  }
  get ReputationReward() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.reputationrewardLength(),
      this.reputationreward,
      this,
    );
  }
  get PartyTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.partytagsLength(),
      this.partytags,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsInfluence(t, i) {
    return (i || new Influence()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  extradesc(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  showicon() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  logo(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  dailytaskshow() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  rawrelation() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  relationcondition() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lastrelation() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reputationmax() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 1e4;
  }
  GetReputationitemAt(t, i) {
    return this.reputationitem(t);
  }
  reputationitem(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    return s
      ? (i || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  reputationitemLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetReputationrewardAt(t, i) {
    return this.reputationreward(t);
  }
  reputationreward(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    return s
      ? (i || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  reputationrewardLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPartytagsAt(t) {
    return this.partytags(t);
  }
  partytags(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  partytagsLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  partytagsArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.Influence = Influence;
//# sourceMappingURL=Influence.js.map
