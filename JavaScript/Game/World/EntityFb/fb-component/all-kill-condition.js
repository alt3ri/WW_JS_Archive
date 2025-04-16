"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AllKillCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AllKillCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsAllKillCondition(i, t) {
    return (t || new AllKillCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsAllKillCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AllKillCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readUint8(this.bb_pos + i) : 0;
  }
  static startAllKillCondition(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static endAllKillCondition(i) {
    return i.endObject();
  }
  static createAllKillCondition(i, t) {
    return (
      AllKillCondition.startAllKillCondition(i),
      AllKillCondition.addType(i, t),
      AllKillCondition.endAllKillCondition(i)
    );
  }
}
exports.AllKillCondition = AllKillCondition;
//# sourceMappingURL=all-kill-condition.js.map
