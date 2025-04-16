"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitLogicChangeNextState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeNextState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitLogicChangeNextState(t, e) {
    return (e || new HitLogicChangeNextState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitLogicChangeNextState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitLogicChangeNextState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitLogicChangeNextState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeNextState(t) {
    return t.endObject();
  }
  static createHitLogicChangeNextState(t, e) {
    return (
      HitLogicChangeNextState.startHitLogicChangeNextState(t),
      HitLogicChangeNextState.addType(t, e),
      HitLogicChangeNextState.endHitLogicChangeNextState(t)
    );
  }
}
exports.HitLogicChangeNextState = HitLogicChangeNextState;
//# sourceMappingURL=hit-logic-change-next-state.js.map
