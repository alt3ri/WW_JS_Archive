"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeNpcPerformState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeNpcPerformState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeNpcPerformState(t, e) {
    return (e || new ChangeNpcPerformState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeNpcPerformState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeNpcPerformState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startChangeNpcPerformState(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endChangeNpcPerformState(t) {
    return t.endObject();
  }
  static createChangeNpcPerformState(t, e, r) {
    return (
      ChangeNpcPerformState.startChangeNpcPerformState(t),
      ChangeNpcPerformState.addEntityId(t, e),
      ChangeNpcPerformState.addState(t, r),
      ChangeNpcPerformState.endChangeNpcPerformState(t)
    );
  }
}
exports.ChangeNpcPerformState = ChangeNpcPerformState;
//# sourceMappingURL=change-npc-perform-state.js.map
