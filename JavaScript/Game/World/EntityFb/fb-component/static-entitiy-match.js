"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StaticEntitiyMatch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_category_js_1 = require("../fb-component/entity-category.js");
class StaticEntitiyMatch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsStaticEntitiyMatch(t, i) {
    return (i || new StaticEntitiyMatch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStaticEntitiyMatch(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new StaticEntitiyMatch()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  category(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new entity_category_js_1.EntityCategory()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  categoryType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startStaticEntitiyMatch(t) {
    t.startObject(2);
  }
  static addCategory(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCategoryType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endStaticEntitiyMatch(t) {
    return t.endObject();
  }
  static createStaticEntitiyMatch(t, i, a) {
    return (
      StaticEntitiyMatch.startStaticEntitiyMatch(t),
      StaticEntitiyMatch.addCategory(t, i),
      StaticEntitiyMatch.addCategoryType(t, a),
      StaticEntitiyMatch.endStaticEntitiyMatch(t)
    );
  }
}
exports.StaticEntitiyMatch = StaticEntitiyMatch;
//# sourceMappingURL=static-entitiy-match.js.map
