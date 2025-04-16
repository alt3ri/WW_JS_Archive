"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillCustom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class ExploreSkillCustom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsExploreSkillCustom(t, i) {
    return (i || new ExploreSkillCustom()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExploreSkillCustom(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ExploreSkillCustom()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  lockConfigId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startExploreSkillCustom(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addLockConfigId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endExploreSkillCustom(t) {
    return t.endObject();
  }
  static createExploreSkillCustom(t, i, s, o) {
    return (
      ExploreSkillCustom.startExploreSkillCustom(t),
      ExploreSkillCustom.addType(t, i),
      ExploreSkillCustom.addLockConfigId(t, s),
      ExploreSkillCustom.addActions(t, o),
      ExploreSkillCustom.endExploreSkillCustom(t)
    );
  }
}
exports.ExploreSkillCustom = ExploreSkillCustom;
//# sourceMappingURL=explore-skill-custom.js.map
