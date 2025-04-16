"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Conditions = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_js_1 = require("../fb-action/condition.js");
class Conditions {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsConditions(t, i) {
    return (i || new Conditions()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConditions(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new Conditions()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  logicOpType(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  conditions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (i || new condition_js_1.Condition()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startConditions(t) {
    t.startObject(2);
  }
  static addLogicOpType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endConditions(t) {
    return t.endObject();
  }
  static createConditions(t, i, s) {
    return (
      Conditions.startConditions(t),
      Conditions.addLogicOpType(t, i),
      Conditions.addConditions(t, s),
      Conditions.endConditions(t)
    );
  }
}
exports.Conditions = Conditions;
//# sourceMappingURL=conditions.js.map
