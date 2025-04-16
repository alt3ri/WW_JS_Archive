"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingActivity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get TimeQuantumId() {
    return this.timequantumid();
  }
  get MilestonItemId() {
    return this.milestonitemid();
  }
  get PreviewWeaponId() {
    return this.previewweaponid();
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
  static getRootAsFishingActivity(t, i) {
    return (i || new FishingActivity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  timequantumid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  milestonitemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  previewweaponid() {
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
exports.FishingActivity = FishingActivity;
//# sourceMappingURL=FishingActivity.js.map
