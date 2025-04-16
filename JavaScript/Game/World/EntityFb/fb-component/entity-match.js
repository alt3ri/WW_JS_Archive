"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityMatch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_category_js_1 = require("../fb-component/entity-category.js"),
  entity_state_js_1 = require("../fb-component/entity-state.js");
class EntityMatch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityMatch(t, e) {
    return (e || new EntityMatch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityMatch(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityMatch()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  allCharacter() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  onlyPlayer() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  categories(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (e || new entity_category_js_1.EntityCategory()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  categoriesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  states(t, e) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (e || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  statesLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  performanceStates(t, e) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  performanceStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityMatch(t) {
    t.startObject(5);
  }
  static addAllCharacter(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addOnlyPlayer(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addCategories(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCategoriesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startCategoriesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addStates(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addPerformanceStates(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createPerformanceStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startPerformanceStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEntityMatch(t) {
    return t.endObject();
  }
  static createEntityMatch(t, e, s, i, r, a) {
    return (
      EntityMatch.startEntityMatch(t),
      EntityMatch.addAllCharacter(t, e),
      EntityMatch.addOnlyPlayer(t, s),
      EntityMatch.addCategories(t, i),
      EntityMatch.addStates(t, r),
      EntityMatch.addPerformanceStates(t, a),
      EntityMatch.endEntityMatch(t)
    );
  }
}
exports.EntityMatch = EntityMatch;
//# sourceMappingURL=entity-match.js.map
