"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreChildQuest = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  child_quest_condition_js_1 = require("../fb-condition/child-quest-condition.js");
class PreChildQuest {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPreChildQuest(t, e) {
    return (e || new PreChildQuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPreChildQuest(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PreChildQuest()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  preChildQuest(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new child_quest_condition_js_1.ChildQuestCondition()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startPreChildQuest(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPreChildQuest(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endPreChildQuest(t) {
    return t.endObject();
  }
}
exports.PreChildQuest = PreChildQuest;
//# sourceMappingURL=pre-child-quest.js.map
