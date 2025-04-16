"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChildQuestCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChildQuestCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsChildQuestCondition(t, i) {
    return (i || new ChildQuestCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChildQuestCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ChildQuestCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  childQuestId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChildQuestCondition(t) {
    t.startObject(2);
  }
  static addQuestId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addChildQuestId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endChildQuestCondition(t) {
    return t.endObject();
  }
  static createChildQuestCondition(t, i, s) {
    return (
      ChildQuestCondition.startChildQuestCondition(t),
      ChildQuestCondition.addQuestId(t, i),
      ChildQuestCondition.addChildQuestId(t, s),
      ChildQuestCondition.endChildQuestCondition(t)
    );
  }
}
exports.ChildQuestCondition = ChildQuestCondition;
//# sourceMappingURL=child-quest-condition.js.map
