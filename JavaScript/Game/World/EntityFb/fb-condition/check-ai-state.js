"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckAiState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckAiState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckAiState(t, e) {
    return (e || new CheckAiState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckAiState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckAiState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  stateType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckAiState(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addStateType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckAiState(t) {
    return t.endObject();
  }
  static createCheckAiState(t, e, i, s) {
    return (
      CheckAiState.startCheckAiState(t),
      CheckAiState.addType(t, e),
      CheckAiState.addCompare(t, i),
      CheckAiState.addStateType(t, s),
      CheckAiState.endCheckAiState(t)
    );
  }
}
exports.CheckAiState = CheckAiState;
//# sourceMappingURL=check-ai-state.js.map
