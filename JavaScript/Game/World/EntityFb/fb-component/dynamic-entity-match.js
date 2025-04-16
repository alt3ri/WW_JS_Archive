"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicEntityMatch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_category_js_1 = require("../fb-component/entity-category.js"),
  entity_state_js_1 = require("../fb-component/entity-state.js");
class DynamicEntityMatch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDynamicEntityMatch(t, i) {
    return (i || new DynamicEntityMatch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicEntityMatch(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DynamicEntityMatch()).__init(
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
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  hasProperty(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, i)
      : void 0;
  }
  hasPropertyLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  noProperty(t, i) {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, i)
      : void 0;
  }
  noPropertyLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startDynamicEntityMatch(t) {
    t.startObject(6);
  }
  static addCategory(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCategoryType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addState(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addHasProperty(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createHasPropertyVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startHasPropertyVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addNoProperty(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createNoPropertyVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startNoPropertyVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endDynamicEntityMatch(t) {
    return t.endObject();
  }
}
exports.DynamicEntityMatch = DynamicEntityMatch;
//# sourceMappingURL=dynamic-entity-match.js.map
