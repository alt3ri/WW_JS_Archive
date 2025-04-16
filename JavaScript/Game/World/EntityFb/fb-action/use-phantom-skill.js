"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UsePhantomSkill = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  skill_blackboard_vector_js_1 = require("../fb-action/skill-blackboard-vector.js");
class UsePhantomSkill {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsUsePhantomSkill(t, s) {
    return (s || new UsePhantomSkill()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUsePhantomSkill(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new UsePhantomSkill()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  skillType(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  blackboardPos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new skill_blackboard_vector_js_1.SkillBlackboardVector()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  blackboardRot(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (t || new skill_blackboard_vector_js_1.SkillBlackboardVector()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startUsePhantomSkill(t) {
    t.startObject(3);
  }
  static addSkillType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addBlackboardPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addBlackboardRot(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static endUsePhantomSkill(t) {
    return t.endObject();
  }
}
exports.UsePhantomSkill = UsePhantomSkill;
//# sourceMappingURL=use-phantom-skill.js.map
