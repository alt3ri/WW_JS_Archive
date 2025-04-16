"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurabilityState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurabilityState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDurabilityState(t, i) {
    return (i || new DurabilityState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDurabilityState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DurabilityState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  durability() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startDurabilityState(t) {
    t.startObject(2);
  }
  static addDurability(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endDurabilityState(t) {
    return t.endObject();
  }
  static createDurabilityState(t, i, a) {
    return (
      DurabilityState.startDurabilityState(t),
      DurabilityState.addDurability(t, i),
      DurabilityState.addState(t, a),
      DurabilityState.endDurabilityState(t)
    );
  }
}
exports.DurabilityState = DurabilityState;
//# sourceMappingURL=durability-state.js.map
