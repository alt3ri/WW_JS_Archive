"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStateStandby = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class InitStateStandby {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInitStateStandby(t, i) {
    return (i || new InitStateStandby()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitStateStandby(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InitStateStandby()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  standbyTags(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, i)
      : void 0;
  }
  standbyTagsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  conditions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  wander() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startInitStateStandby(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addStandbyTags(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createStandbyTagsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startStandbyTagsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addConditions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createConditionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addWander(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static endInitStateStandby(t) {
    return t.endObject();
  }
  static createInitStateStandby(t, i, s, n, a) {
    return (
      InitStateStandby.startInitStateStandby(t),
      InitStateStandby.addType(t, i),
      InitStateStandby.addStandbyTags(t, s),
      InitStateStandby.addConditions(t, n),
      InitStateStandby.addWander(t, a),
      InitStateStandby.endInitStateStandby(t)
    );
  }
}
exports.InitStateStandby = InitStateStandby;
//# sourceMappingURL=init-state-standby.js.map
