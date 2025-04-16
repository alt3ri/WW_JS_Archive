"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitLogicChangeLockState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeLockState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitLogicChangeLockState(t, e) {
    return (e || new HitLogicChangeLockState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitLogicChangeLockState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitLogicChangeLockState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitLogicChangeLockState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeLockState(t) {
    return t.endObject();
  }
  static createHitLogicChangeLockState(t, e) {
    return (
      HitLogicChangeLockState.startHitLogicChangeLockState(t),
      HitLogicChangeLockState.addType(t, e),
      HitLogicChangeLockState.endHitLogicChangeLockState(t)
    );
  }
}
exports.HitLogicChangeLockState = HitLogicChangeLockState;
//# sourceMappingURL=hit-logic-change-lock-state.js.map
