"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeState(t, e) {
    return (e || new ChangeState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChangeState(t) {
    t.startObject(1);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeState(t) {
    return t.endObject();
  }
  static createChangeState(t, e) {
    return (
      ChangeState.startChangeState(t),
      ChangeState.addStateId(t, e),
      ChangeState.endChangeState(t)
    );
  }
}
exports.ChangeState = ChangeState;
//# sourceMappingURL=change-state.js.map
