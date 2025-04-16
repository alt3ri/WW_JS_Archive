"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EndState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EndState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEndState(t, e) {
    return (e || new EndState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEndState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EndState()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  stayFlowMontageActors(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  stayFlowMontageActorsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  stayFlowMontageActorsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startEndState(t) {
    t.startObject(1);
  }
  static addStayFlowMontageActors(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createStayFlowMontageActorsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addInt32(s[t]);
    return e.endVector();
  }
  static startStayFlowMontageActorsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEndState(t) {
    return t.endObject();
  }
  static createEndState(t, e) {
    return (
      EndState.startEndState(t),
      EndState.addStayFlowMontageActors(t, e),
      EndState.endEndState(t)
    );
  }
}
exports.EndState = EndState;
//# sourceMappingURL=end-state.js.map
