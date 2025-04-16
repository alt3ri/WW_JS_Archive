"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetTimeLockState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetTimeLockState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetTimeLockState(t, e) {
    return (e || new SetTimeLockState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetTimeLockState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetTimeLockState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  lockState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSetTimeLockState(t) {
    t.startObject(1);
  }
  static addLockState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSetTimeLockState(t) {
    return t.endObject();
  }
  static createSetTimeLockState(t, e) {
    return (
      SetTimeLockState.startSetTimeLockState(t),
      SetTimeLockState.addLockState(t, e),
      SetTimeLockState.endSetTimeLockState(t)
    );
  }
}
exports.SetTimeLockState = SetTimeLockState;
//# sourceMappingURL=set-time-lock-state.js.map
