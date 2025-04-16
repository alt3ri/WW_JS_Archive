"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompleteChildQuest = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompleteChildQuest {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCompleteChildQuest(t, e) {
    return (e || new CompleteChildQuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompleteChildQuest(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CompleteChildQuest()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  nodeId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCompleteChildQuest(t) {
    t.startObject(2);
  }
  static addQuestId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addNodeId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endCompleteChildQuest(t) {
    return t.endObject();
  }
  static createCompleteChildQuest(t, e, s) {
    return (
      CompleteChildQuest.startCompleteChildQuest(t),
      CompleteChildQuest.addQuestId(t, e),
      CompleteChildQuest.addNodeId(t, s),
      CompleteChildQuest.endCompleteChildQuest(t)
    );
  }
}
exports.CompleteChildQuest = CompleteChildQuest;
//# sourceMappingURL=complete-child-quest.js.map
