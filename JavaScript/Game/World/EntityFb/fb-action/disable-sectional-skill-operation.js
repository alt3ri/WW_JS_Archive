"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableSectionalSkillOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  disable_explore_skill_js_1 = require("../fb-action/disable-explore-skill.js");
class DisableSectionalSkillOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsDisableSectionalSkillOperation(i, t) {
    return (t || new DisableSectionalSkillOperation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsDisableSectionalSkillOperation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableSectionalSkillOperation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  displayMode(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  disableExploreSkill(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? (i || new disable_explore_skill_js_1.DisableExploreSkill()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  disableSkillWheel() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startDisableSectionalSkillOperation(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addDisplayMode(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addDisableExploreSkill(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addDisableSkillWheel(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endDisableSectionalSkillOperation(i) {
    return i.endObject();
  }
}
exports.DisableSectionalSkillOperation = DisableSectionalSkillOperation;
//# sourceMappingURL=disable-sectional-skill-operation.js.map
