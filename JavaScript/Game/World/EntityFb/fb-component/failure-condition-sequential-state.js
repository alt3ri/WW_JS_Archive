"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FailureConditionSequentialState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FailureConditionSequentialState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFailureConditionSequentialState(t, e) {
    return (e || new FailureConditionSequentialState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFailureConditionSequentialState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FailureConditionSequentialState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  order(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  orderLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  orderArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startFailureConditionSequentialState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addOrder(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createOrderVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startOrderVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFailureConditionSequentialState(t) {
    return t.endObject();
  }
  static createFailureConditionSequentialState(t, e, i) {
    return (
      FailureConditionSequentialState.startFailureConditionSequentialState(t),
      FailureConditionSequentialState.addType(t, e),
      FailureConditionSequentialState.addOrder(t, i),
      FailureConditionSequentialState.endFailureConditionSequentialState(t)
    );
  }
}
exports.FailureConditionSequentialState = FailureConditionSequentialState;
//# sourceMappingURL=failure-condition-sequential-state.js.map
