"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitLogicChangeCountDownState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeCountDownState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitLogicChangeCountDownState(t, e) {
    return (e || new HitLogicChangeCountDownState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitLogicChangeCountDownState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitLogicChangeCountDownState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitLogicChangeCountDownState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeCountDownState(t) {
    return t.endObject();
  }
  static createHitLogicChangeCountDownState(t, e) {
    return (
      HitLogicChangeCountDownState.startHitLogicChangeCountDownState(t),
      HitLogicChangeCountDownState.addType(t, e),
      HitLogicChangeCountDownState.endHitLogicChangeCountDownState(t)
    );
  }
}
exports.HitLogicChangeCountDownState = HitLogicChangeCountDownState;
//# sourceMappingURL=hit-logic-change-count-down-state.js.map
