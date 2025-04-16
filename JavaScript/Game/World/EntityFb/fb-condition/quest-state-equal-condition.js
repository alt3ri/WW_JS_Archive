"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestStateEqualCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestStateEqualCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsQuestStateEqualCondition(t, e) {
    return (e || new QuestStateEqualCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsQuestStateEqualCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new QuestStateEqualCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startQuestStateEqualCondition(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addQuestId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endQuestStateEqualCondition(t) {
    return t.endObject();
  }
  static createQuestStateEqualCondition(t, e, i, s, a) {
    return (
      QuestStateEqualCondition.startQuestStateEqualCondition(t),
      QuestStateEqualCondition.addType(t, e),
      QuestStateEqualCondition.addQuestId(t, i),
      QuestStateEqualCondition.addState(t, s),
      QuestStateEqualCondition.addCompare(t, a),
      QuestStateEqualCondition.endQuestStateEqualCondition(t)
    );
  }
}
exports.QuestStateEqualCondition = QuestStateEqualCondition;
//# sourceMappingURL=quest-state-equal-condition.js.map
