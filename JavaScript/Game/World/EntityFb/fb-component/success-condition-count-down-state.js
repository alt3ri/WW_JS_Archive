"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuccessConditionCountDownState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionCountDownState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsSuccessConditionCountDownState(t, o) {
    return (o || new SuccessConditionCountDownState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuccessConditionCountDownState(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new SuccessConditionCountDownState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startSuccessConditionCountDownState(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static endSuccessConditionCountDownState(t) {
    return t.endObject();
  }
  static createSuccessConditionCountDownState(t, o) {
    return (
      SuccessConditionCountDownState.startSuccessConditionCountDownState(t),
      SuccessConditionCountDownState.addType(t, o),
      SuccessConditionCountDownState.endSuccessConditionCountDownState(t)
    );
  }
}
exports.SuccessConditionCountDownState = SuccessConditionCountDownState;
//# sourceMappingURL=success-condition-count-down-state.js.map
