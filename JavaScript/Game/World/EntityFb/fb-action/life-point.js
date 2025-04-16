"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LifePoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  life_point_color_board_js_1 = require("../fb-action/life-point-color-board.js"),
  life_point_max_step_reward_rule_item_js_1 = require("../fb-action/life-point-max-step-reward-rule-item.js");
class LifePoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsLifePoint(t, i) {
    return (i || new LifePoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLifePoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LifePoint()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  colorBoard(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new life_point_color_board_js_1.LifePointColorBoard()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  stepLimit() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tidDesc(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  maxStepRewardRule(t, i) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (
          i ||
          new life_point_max_step_reward_rule_item_js_1.LifePointMaxStepRewardRuleItem()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  maxStepRewardRuleLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startLifePoint(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addColorBoard(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addStepLimit(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addTidDesc(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addMaxStepRewardRule(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createMaxStepRewardRuleVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMaxStepRewardRuleVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endLifePoint(t) {
    return t.endObject();
  }
}
exports.LifePoint = LifePoint;
//# sourceMappingURL=life-point.js.map
