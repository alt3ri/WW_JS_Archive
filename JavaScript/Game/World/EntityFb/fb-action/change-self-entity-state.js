"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeSelfEntityState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeSelfEntityState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeSelfEntityState(t, e) {
    return (e || new ChangeSelfEntityState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeSelfEntityState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeSelfEntityState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startChangeSelfEntityState(t) {
    t.startObject(1);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeSelfEntityState(t) {
    return t.endObject();
  }
  static createChangeSelfEntityState(t, e) {
    return (
      ChangeSelfEntityState.startChangeSelfEntityState(t),
      ChangeSelfEntityState.addEntityState(t, e),
      ChangeSelfEntityState.endChangeSelfEntityState(t)
    );
  }
}
exports.ChangeSelfEntityState = ChangeSelfEntityState;
//# sourceMappingURL=change-self-entity-state.js.map
