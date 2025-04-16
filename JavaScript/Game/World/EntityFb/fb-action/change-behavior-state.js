"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeBehaviorState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeBehaviorState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeBehaviorState(t, e) {
    return (e || new ChangeBehaviorState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeBehaviorState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeBehaviorState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isInstant() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startChangeBehaviorState(t) {
    t.startObject(2);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsInstant(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endChangeBehaviorState(t) {
    return t.endObject();
  }
  static createChangeBehaviorState(t, e, a) {
    return (
      ChangeBehaviorState.startChangeBehaviorState(t),
      ChangeBehaviorState.addStateId(t, e),
      ChangeBehaviorState.addIsInstant(t, a),
      ChangeBehaviorState.endChangeBehaviorState(t)
    );
  }
}
exports.ChangeBehaviorState = ChangeBehaviorState;
//# sourceMappingURL=change-behavior-state.js.map
