"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhalationMatching = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js");
class InhalationMatching {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInhalationMatching(t, i) {
    return (i || new InhalationMatching()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInhalationMatching(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InhalationMatching()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  inhalationStrength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (
          t || new category_matching_condition_js_1.CategoryMatchingCondition()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startInhalationMatching(t) {
    t.startObject(2);
  }
  static addInhalationStrength(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addEntityMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endInhalationMatching(t) {
    return t.endObject();
  }
}
exports.InhalationMatching = InhalationMatching;
//# sourceMappingURL=inhalation-matching.js.map
