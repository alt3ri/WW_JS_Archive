"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitLogicChangeNextAndLockTargetState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeNextAndLockTargetState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitLogicChangeNextAndLockTargetState(t, e) {
    return (e || new HitLogicChangeNextAndLockTargetState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitLogicChangeNextAndLockTargetState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitLogicChangeNextAndLockTargetState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitLogicChangeNextAndLockTargetState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endHitLogicChangeNextAndLockTargetState(t) {
    return t.endObject();
  }
  static createHitLogicChangeNextAndLockTargetState(t, e, a) {
    return (
      HitLogicChangeNextAndLockTargetState.startHitLogicChangeNextAndLockTargetState(
        t,
      ),
      HitLogicChangeNextAndLockTargetState.addType(t, e),
      HitLogicChangeNextAndLockTargetState.addTargetState(t, a),
      HitLogicChangeNextAndLockTargetState.endHitLogicChangeNextAndLockTargetState(
        t,
      )
    );
  }
}
exports.HitLogicChangeNextAndLockTargetState =
  HitLogicChangeNextAndLockTargetState;
//# sourceMappingURL=hit-logic-change-next-and-lock-target-state.js.map
