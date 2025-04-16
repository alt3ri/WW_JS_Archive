"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckChildQuestStatus = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckChildQuestStatus {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCheckChildQuestStatus(t, s) {
    return (s || new CheckChildQuestStatus()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckChildQuestStatus(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CheckChildQuestStatus()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  nodeId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  status() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startCheckChildQuestStatus(t) {
    t.startObject(3);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addNodeId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addStatus(t, s) {
    t.addFieldInt8(2, s, 0);
  }
  static endCheckChildQuestStatus(t) {
    return t.endObject();
  }
  static createCheckChildQuestStatus(t, s, e, i) {
    return (
      CheckChildQuestStatus.startCheckChildQuestStatus(t),
      CheckChildQuestStatus.addType(t, s),
      CheckChildQuestStatus.addNodeId(t, e),
      CheckChildQuestStatus.addStatus(t, i),
      CheckChildQuestStatus.endCheckChildQuestStatus(t)
    );
  }
}
exports.CheckChildQuestStatus = CheckChildQuestStatus;
//# sourceMappingURL=check-child-quest-status.js.map
