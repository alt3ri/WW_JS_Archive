"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CategoryMatchingConfigBase = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  category_matching_animation_base_js_1 = require("../fb-component/category-matching-animation-base.js"),
  category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js"),
  category_matching_succeed_base_js_1 = require("../fb-component/category-matching-succeed-base.js");
class CategoryMatchingConfigBase {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCategoryMatchingConfigBase(t, i) {
    return (i || new CategoryMatchingConfigBase()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCategoryMatchingConfigBase(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CategoryMatchingConfigBase()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (
          t || new category_matching_condition_js_1.CategoryMatchingCondition()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  animation(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (
          t ||
          new category_matching_animation_base_js_1.CategoryMatchingAnimationBase()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  callback(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t ||
          new category_matching_succeed_base_js_1.CategoryMatchingSucceedBase()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startCategoryMatchingConfigBase(t) {
    t.startObject(3);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAnimation(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addCallback(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCategoryMatchingConfigBase(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingConfigBase = CategoryMatchingConfigBase;
//# sourceMappingURL=category-matching-config-base.js.map
