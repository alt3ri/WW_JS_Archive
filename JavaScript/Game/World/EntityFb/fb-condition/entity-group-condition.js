"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityGroupCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_event_condition_js_1 = require("../fb-condition/entity-event-condition.js");
class EntityGroupCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityGroupCondition(t, i) {
    return (i || new EntityGroupCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityGroupCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityGroupCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  conditions(t, i) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (i || new entity_event_condition_js_1.EntityEventCondition()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityGroupCondition(t) {
    t.startObject(3);
  }
  static addCount(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createConditionsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) i.addOffset(n[t]);
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEntityGroupCondition(t) {
    return t.endObject();
  }
  static createEntityGroupCondition(t, i, n, o) {
    return (
      EntityGroupCondition.startEntityGroupCondition(t),
      EntityGroupCondition.addCount(t, i),
      EntityGroupCondition.addCompare(t, n),
      EntityGroupCondition.addConditions(t, o),
      EntityGroupCondition.endEntityGroupCondition(t)
    );
  }
}
exports.EntityGroupCondition = EntityGroupCondition;
//# sourceMappingURL=entity-group-condition.js.map
