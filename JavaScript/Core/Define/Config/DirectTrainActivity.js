"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DirectTrainActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DirectTrainActivity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SkipQuestId() {
    return this.skipquestid();
  }
  get ForceRemindCond() {
    return this.forceremindcond();
  }
  get SkipQuestCondition() {
    return this.skipquestcondition();
  }
  get RecommendQuestId() {
    return this.recommendquestid();
  }
  get RecommendQuestLinkList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.recommendquestlinklistLength(),
      this.recommendquestlinklist,
      this,
    );
  }
  get RecommendQuestLabel() {
    return this.recommendquestlabel();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDirectTrainActivity(t, i) {
    return (i || new DirectTrainActivity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skipquestid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  forceremindcond() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skipquestcondition() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRecommendquestlinklistAt(t) {
    return this.recommendquestlinklist(t);
  }
  recommendquestlinklist(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  recommendquestlinklistLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  recommendquestlinklistArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  recommendquestlabel(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.DirectTrainActivity = DirectTrainActivity;
//# sourceMappingURL=DirectTrainActivity.js.map
