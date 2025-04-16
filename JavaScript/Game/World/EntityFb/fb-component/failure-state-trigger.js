"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FailureStateTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  operations_after_entity_group_failure_js_1 = require("../fb-component/operations-after-entity-group-failure.js");
class FailureStateTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFailureStateTrigger(t, i) {
    return (i || new FailureStateTrigger()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFailureStateTrigger(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FailureStateTrigger()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  failureConditionsType(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  failureConditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  failureConditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  failureConditions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + 4 * t)
      : void 0;
  }
  failureConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  failureOperations(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t ||
          new operations_after_entity_group_failure_js_1.OperationsAfterEntityGroupFailure()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startFailureStateTrigger(t) {
    t.startObject(3);
  }
  static addFailureConditionsType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createFailureConditionsTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt8(r[t]);
    return i.endVector();
  }
  static startFailureConditionsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addFailureConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createFailureConditionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startFailureConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFailureOperations(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endFailureStateTrigger(t) {
    return t.endObject();
  }
}
exports.FailureStateTrigger = FailureStateTrigger;
//# sourceMappingURL=failure-state-trigger.js.map
