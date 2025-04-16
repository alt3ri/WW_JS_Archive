"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerSkillReadyCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_skill_ready_option_js_1 = require("../fb-condition/union-skill-ready-option.js");
class CheckPlayerSkillReadyCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckPlayerSkillReadyCondition(i, t) {
    return (t || new CheckPlayerSkillReadyCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckPlayerSkillReadyCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckPlayerSkillReadyCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  skillOptionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_skill_ready_option_js_1.UnionSkillReadyOption.NONE;
  }
  skillOption(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startCheckPlayerSkillReadyCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSkillOptionType(i, t) {
    i.addFieldInt8(
      1,
      t,
      union_skill_ready_option_js_1.UnionSkillReadyOption.NONE,
    );
  }
  static addSkillOption(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckPlayerSkillReadyCondition(i) {
    return i.endObject();
  }
  static createCheckPlayerSkillReadyCondition(i, t, e, l) {
    return (
      CheckPlayerSkillReadyCondition.startCheckPlayerSkillReadyCondition(i),
      CheckPlayerSkillReadyCondition.addType(i, t),
      CheckPlayerSkillReadyCondition.addSkillOptionType(i, e),
      CheckPlayerSkillReadyCondition.addSkillOption(i, l),
      CheckPlayerSkillReadyCondition.endCheckPlayerSkillReadyCondition(i)
    );
  }
}
exports.CheckPlayerSkillReadyCondition = CheckPlayerSkillReadyCondition;
//# sourceMappingURL=check-player-skill-ready-condition.js.map
