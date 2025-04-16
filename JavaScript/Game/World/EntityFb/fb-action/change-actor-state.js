"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActorState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeActorState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeActorState(t, e) {
    return (e || new ChangeActorState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeActorState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeActorState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startChangeActorState(t) {
    t.startObject(1);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeActorState(t) {
    return t.endObject();
  }
  static createChangeActorState(t, e) {
    return (
      ChangeActorState.startChangeActorState(t),
      ChangeActorState.addState(t, e),
      ChangeActorState.endChangeActorState(t)
    );
  }
}
exports.ChangeActorState = ChangeActorState;
//# sourceMappingURL=change-actor-state.js.map
