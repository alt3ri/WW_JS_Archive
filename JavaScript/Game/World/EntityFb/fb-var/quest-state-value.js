"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestStateValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestStateValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsQuestStateValue(t, e) {
    return (e || new QuestStateValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsQuestStateValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new QuestStateValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startQuestStateValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endQuestStateValue(t) {
    return t.endObject();
  }
  static createQuestStateValue(t, e) {
    return (
      QuestStateValue.startQuestStateValue(t),
      QuestStateValue.addV(t, e),
      QuestStateValue.endQuestStateValue(t)
    );
  }
}
exports.QuestStateValue = QuestStateValue;
//# sourceMappingURL=quest-state-value.js.map
