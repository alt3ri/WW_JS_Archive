"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivityConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CiacconaActivityConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Slots() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.slotsLength(),
      this.slots,
      this,
    );
  }
  get InspirationInitValue() {
    return this.inspirationinitvalue();
  }
  get InspirationMaxValue() {
    return this.inspirationmaxvalue();
  }
  get InspirationRecoverSec() {
    return this.inspirationrecoversec();
  }
  get LimitRewardDuration() {
    return this.limitrewardduration();
  }
  get State1UnlockCondition() {
    return this.state1unlockcondition();
  }
  get State2UnlockCondition() {
    return this.state2unlockcondition();
  }
  get RecommendQuestId() {
    return this.recommendquestid();
  }
  get RecommendQuestTips() {
    return this.recommendquesttips();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsCiacconaActivityConfig(t, i) {
    return (i || new CiacconaActivityConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSlotsAt(t) {
    return this.slots(t);
  }
  slots(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  slotsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  slotsArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  inspirationinitvalue() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  inspirationmaxvalue() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  inspirationrecoversec() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  limitrewardduration() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  state1unlockcondition() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  state2unlockcondition() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  recommendquesttips(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.CiacconaActivityConfig = CiacconaActivityConfig;
//# sourceMappingURL=CiacconaActivityConfig.js.map
