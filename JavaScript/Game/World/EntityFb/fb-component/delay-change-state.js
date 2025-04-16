"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelayChangeState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DelayChangeState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDelayChangeState(t, e) {
    return (e || new DelayChangeState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDelayChangeState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DelayChangeState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  newState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startDelayChangeState(t) {
    t.startObject(2);
  }
  static addTime(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addNewState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endDelayChangeState(t) {
    return t.endObject();
  }
  static createDelayChangeState(t, e, a) {
    return (
      DelayChangeState.startDelayChangeState(t),
      DelayChangeState.addTime(t, e),
      DelayChangeState.addNewState(t, a),
      DelayChangeState.endDelayChangeState(t)
    );
  }
}
exports.DelayChangeState = DelayChangeState;
//# sourceMappingURL=delay-change-state.js.map
