"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsQuestValue(t, e) {
    return (e || new QuestValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsQuestValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new QuestValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startQuestValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endQuestValue(t) {
    return t.endObject();
  }
  static createQuestValue(t, e) {
    return (
      QuestValue.startQuestValue(t),
      QuestValue.addV(t, e),
      QuestValue.endQuestValue(t)
    );
  }
}
exports.QuestValue = QuestValue;
//# sourceMappingURL=quest-value.js.map
