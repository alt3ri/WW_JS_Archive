"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffAreaStateConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class BuffAreaStateConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsBuffAreaStateConfig(t, i) {
    return (i || new BuffAreaStateConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBuffAreaStateConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new BuffAreaStateConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  buffIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + i) + 8 * t)
      : BigInt(0);
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startBuffAreaStateConfig(t) {
    t.startObject(3);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuffIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createBuffIdsVector(i, s) {
    i.startVector(8, s.length, 8);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt64(s[t]);
    return i.endVector();
  }
  static startBuffIdsVector(t, i) {
    t.startVector(8, i, 8);
  }
  static addCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endBuffAreaStateConfig(t) {
    return t.endObject();
  }
}
exports.BuffAreaStateConfig = BuffAreaStateConfig;
//# sourceMappingURL=buff-area-state-config.js.map
