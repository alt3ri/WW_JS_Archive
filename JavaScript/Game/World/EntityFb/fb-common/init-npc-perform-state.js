"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitNpcPerformState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitNpcPerformState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInitNpcPerformState(t, e) {
    return (e || new InitNpcPerformState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitNpcPerformState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InitNpcPerformState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startInitNpcPerformState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endInitNpcPerformState(t) {
    return t.endObject();
  }
  static createInitNpcPerformState(t, e, r) {
    return (
      InitNpcPerformState.startInitNpcPerformState(t),
      InitNpcPerformState.addType(t, e),
      InitNpcPerformState.addState(t, r),
      InitNpcPerformState.endInitNpcPerformState(t)
    );
  }
}
exports.InitNpcPerformState = InitNpcPerformState;
//# sourceMappingURL=init-npc-perform-state.js.map
