"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeRandomState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeRandomState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeRandomState(t, e) {
    return (e || new ChangeRandomState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeRandomState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeRandomState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateIds(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  stateIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  stateIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startChangeRandomState(t) {
    t.startObject(1);
  }
  static addStateIds(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createStateIdsVector(e, a) {
    e.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) e.addInt32(a[t]);
    return e.endVector();
  }
  static startStateIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endChangeRandomState(t) {
    return t.endObject();
  }
  static createChangeRandomState(t, e) {
    return (
      ChangeRandomState.startChangeRandomState(t),
      ChangeRandomState.addStateIds(t, e),
      ChangeRandomState.endChangeRandomState(t)
    );
  }
}
exports.ChangeRandomState = ChangeRandomState;
//# sourceMappingURL=change-random-state.js.map
