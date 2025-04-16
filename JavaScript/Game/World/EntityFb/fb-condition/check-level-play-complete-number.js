"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckLevelPlayCompleteNumber = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckLevelPlayCompleteNumber {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckLevelPlayCompleteNumber(e, t) {
    return (t || new CheckLevelPlayCompleteNumber()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckLevelPlayCompleteNumber(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckLevelPlayCompleteNumber()).__init(
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
  number() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCheckLevelPlayCompleteNumber(e) {
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
  static addNumber(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCheckLevelPlayCompleteNumber(e) {
    return e.endObject();
  }
  static createCheckLevelPlayCompleteNumber(e, t, r, l, s) {
    return (
      CheckLevelPlayCompleteNumber.startCheckLevelPlayCompleteNumber(e),
      CheckLevelPlayCompleteNumber.addType(e, t),
      CheckLevelPlayCompleteNumber.addLevelId(e, r),
      CheckLevelPlayCompleteNumber.addCompare(e, l),
      CheckLevelPlayCompleteNumber.addNumber(e, s),
      CheckLevelPlayCompleteNumber.endCheckLevelPlayCompleteNumber(e)
    );
  }
}
exports.CheckLevelPlayCompleteNumber = CheckLevelPlayCompleteNumber;
//# sourceMappingURL=check-level-play-complete-number.js.map
