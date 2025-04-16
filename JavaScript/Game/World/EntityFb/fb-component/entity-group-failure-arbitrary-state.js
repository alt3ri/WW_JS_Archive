"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityGroupFailureArbitraryState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityGroupFailureArbitraryState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEntityGroupFailureArbitraryState(t, r) {
    return (r || new EntityGroupFailureArbitraryState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityGroupFailureArbitraryState(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EntityGroupFailureArbitraryState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  state(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startEntityGroupFailureArbitraryState(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addState(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endEntityGroupFailureArbitraryState(t) {
    return t.endObject();
  }
  static createEntityGroupFailureArbitraryState(t, r, i) {
    return (
      EntityGroupFailureArbitraryState.startEntityGroupFailureArbitraryState(t),
      EntityGroupFailureArbitraryState.addType(t, r),
      EntityGroupFailureArbitraryState.addState(t, i),
      EntityGroupFailureArbitraryState.endEntityGroupFailureArbitraryState(t)
    );
  }
}
exports.EntityGroupFailureArbitraryState = EntityGroupFailureArbitraryState;
//# sourceMappingURL=entity-group-failure-arbitrary-state.js.map
