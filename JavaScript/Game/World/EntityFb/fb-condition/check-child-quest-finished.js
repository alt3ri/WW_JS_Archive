"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckChildQuestFinished = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckChildQuestFinished {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckChildQuestFinished(i, t) {
    return (t || new CheckChildQuestFinished()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckChildQuestFinished(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckChildQuestFinished()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  questId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  childQuestId() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  compare(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startCheckChildQuestFinished(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addQuestId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addChildQuestId(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addCompare(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static endCheckChildQuestFinished(i) {
    return i.endObject();
  }
  static createCheckChildQuestFinished(i, t, e, s, h) {
    return (
      CheckChildQuestFinished.startCheckChildQuestFinished(i),
      CheckChildQuestFinished.addType(i, t),
      CheckChildQuestFinished.addQuestId(i, e),
      CheckChildQuestFinished.addChildQuestId(i, s),
      CheckChildQuestFinished.addCompare(i, h),
      CheckChildQuestFinished.endCheckChildQuestFinished(i)
    );
  }
}
exports.CheckChildQuestFinished = CheckChildQuestFinished;
//# sourceMappingURL=check-child-quest-finished.js.map
