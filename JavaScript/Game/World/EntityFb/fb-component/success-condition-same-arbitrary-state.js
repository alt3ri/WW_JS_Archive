"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuccessConditionSameArbitraryState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionSameArbitraryState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSuccessConditionSameArbitraryState(t, e) {
    return (e || new SuccessConditionSameArbitraryState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuccessConditionSameArbitraryState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SuccessConditionSameArbitraryState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSuccessConditionSameArbitraryState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSuccessConditionSameArbitraryState(t) {
    return t.endObject();
  }
  static createSuccessConditionSameArbitraryState(t, e) {
    return (
      SuccessConditionSameArbitraryState.startSuccessConditionSameArbitraryState(
        t,
      ),
      SuccessConditionSameArbitraryState.addType(t, e),
      SuccessConditionSameArbitraryState.endSuccessConditionSameArbitraryState(
        t,
      )
    );
  }
}
exports.SuccessConditionSameArbitraryState = SuccessConditionSameArbitraryState;
//# sourceMappingURL=success-condition-same-arbitrary-state.js.map
