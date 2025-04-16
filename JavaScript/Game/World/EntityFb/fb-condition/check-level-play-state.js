"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckLevelPlayState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckLevelPlayState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckLevelPlayState(e, t) {
    return (t || new CheckLevelPlayState()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckLevelPlayState(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckLevelPlayState()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  levelId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  state() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startCheckLevelPlayState(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addLevelId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addState(e, t) {
    e.addFieldInt8(3, t, 0);
  }
  static endCheckLevelPlayState(e) {
    return e.endObject();
  }
  static createCheckLevelPlayState(e, t, a, s, i) {
    return (
      CheckLevelPlayState.startCheckLevelPlayState(e),
      CheckLevelPlayState.addType(e, t),
      CheckLevelPlayState.addLevelId(e, a),
      CheckLevelPlayState.addCompare(e, s),
      CheckLevelPlayState.addState(e, i),
      CheckLevelPlayState.endCheckLevelPlayState(e)
    );
  }
}
exports.CheckLevelPlayState = CheckLevelPlayState;
//# sourceMappingURL=check-level-play-state.js.map
