"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeAdsorptionFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  adsorption_matching_animation_js_1 = require("../fb-component/adsorption-matching-animation.js"),
  category_matching_animation_js_1 = require("../fb-component/category-matching-animation.js"),
  category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js"),
  category_matching_succeed_js_1 = require("../fb-component/category-matching-succeed.js");
class RangeAdsorptionFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRangeAdsorptionFoundation(t, i) {
    return (i || new RangeAdsorptionFoundation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRangeAdsorptionFoundation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RangeAdsorptionFoundation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (
          t || new category_matching_condition_js_1.CategoryMatchingCondition()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  animation(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t ||
          new adsorption_matching_animation_js_1.AdsorptionMatchingAnimation()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  categoryAnimation(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (
          t || new category_matching_animation_js_1.CategoryMatchingAnimation()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  callback(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (
          t || new category_matching_succeed_js_1.CategoryMatchingSucceed()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startRangeAdsorptionFoundation(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addAnimation(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addCategoryAnimation(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addCallback(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endRangeAdsorptionFoundation(t) {
    return t.endObject();
  }
}
exports.RangeAdsorptionFoundation = RangeAdsorptionFoundation;
//# sourceMappingURL=range-adsorption-foundation.js.map
