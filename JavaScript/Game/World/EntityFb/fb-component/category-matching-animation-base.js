"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CategoryMatchingAnimationBase = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CategoryMatchingAnimationBase {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCategoryMatchingAnimationBase(t, i) {
    return (i || new CategoryMatchingAnimationBase()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCategoryMatchingAnimationBase(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CategoryMatchingAnimationBase()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  matchPos(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRot(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchReferenceKey(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startCategoryMatchingAnimationBase(t) {
    t.startObject(3);
  }
  static addMatchPos(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchRot(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMatchReferenceKey(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCategoryMatchingAnimationBase(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingAnimationBase = CategoryMatchingAnimationBase;
//# sourceMappingURL=category-matching-animation-base.js.map
