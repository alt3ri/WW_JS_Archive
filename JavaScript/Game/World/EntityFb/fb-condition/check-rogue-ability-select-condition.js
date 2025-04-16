"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckRogueAbilitySelectCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckRogueAbilitySelectCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckRogueAbilitySelectCondition(t, e) {
    return (e || new CheckRogueAbilitySelectCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckRogueAbilitySelectCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckRogueAbilitySelectCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  boardId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isReceived() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckRogueAbilitySelectCondition(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBoardId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsReceived(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endCheckRogueAbilitySelectCondition(t) {
    return t.endObject();
  }
  static createCheckRogueAbilitySelectCondition(t, e, i, o) {
    return (
      CheckRogueAbilitySelectCondition.startCheckRogueAbilitySelectCondition(t),
      CheckRogueAbilitySelectCondition.addType(t, e),
      CheckRogueAbilitySelectCondition.addBoardId(t, i),
      CheckRogueAbilitySelectCondition.addIsReceived(t, o),
      CheckRogueAbilitySelectCondition.endCheckRogueAbilitySelectCondition(t)
    );
  }
}
exports.CheckRogueAbilitySelectCondition = CheckRogueAbilitySelectCondition;
//# sourceMappingURL=check-rogue-ability-select-condition.js.map
