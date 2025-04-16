"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CategoryMatchingConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  category_matching_animation_js_1 = require("../fb-component/category-matching-animation.js"),
  category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js"),
  category_matching_succeed_js_1 = require("../fb-component/category-matching-succeed.js"),
  item_locking_config_js_1 = require("../fb-component/item-locking-config.js");
class CategoryMatchingConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCategoryMatchingConfig(t, i) {
    return (i || new CategoryMatchingConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCategoryMatchingConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CategoryMatchingConfig()).__init(
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
          t || new category_matching_animation_js_1.CategoryMatchingAnimation()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  callback(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t || new category_matching_succeed_js_1.CategoryMatchingSucceed()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  itemLockingConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new item_locking_config_js_1.ItemLockingConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startCategoryMatchingConfig(t) {
    t.startObject(4);
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
  static addItemLockingConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endCategoryMatchingConfig(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingConfig = CategoryMatchingConfig;
//# sourceMappingURL=category-matching-config.js.map
