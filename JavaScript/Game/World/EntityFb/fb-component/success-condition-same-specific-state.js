"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuccessConditionSameSpecificState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionSameSpecificState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSuccessConditionSameSpecificState(t, e) {
    return (e || new SuccessConditionSameSpecificState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuccessConditionSameSpecificState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SuccessConditionSameSpecificState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSuccessConditionSameSpecificState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSuccessConditionSameSpecificState(t) {
    return t.endObject();
  }
  static createSuccessConditionSameSpecificState(t, e, i) {
    return (
      SuccessConditionSameSpecificState.startSuccessConditionSameSpecificState(
        t,
      ),
      SuccessConditionSameSpecificState.addType(t, e),
      SuccessConditionSameSpecificState.addState(t, i),
      SuccessConditionSameSpecificState.endSuccessConditionSameSpecificState(t)
    );
  }
}
exports.SuccessConditionSameSpecificState = SuccessConditionSameSpecificState;
//# sourceMappingURL=success-condition-same-specific-state.js.map
