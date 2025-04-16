"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProbabilityRefreshItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class ProbabilityRefreshItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsProbabilityRefreshItem(t, i) {
    return (i || new ProbabilityRefreshItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsProbabilityRefreshItem(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ProbabilityRefreshItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  probability() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  refreshEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  additionalCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startProbabilityRefreshItem(t) {
    t.startObject(3);
  }
  static addProbability(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addRefreshEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addAdditionalCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endProbabilityRefreshItem(t) {
    return t.endObject();
  }
}
exports.ProbabilityRefreshItem = ProbabilityRefreshItem;
//# sourceMappingURL=probability-refresh-item.js.map
