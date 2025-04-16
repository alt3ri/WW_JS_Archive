"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillPullGiant = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class ExploreSkillPullGiant {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsExploreSkillPullGiant(t, i) {
    return (i || new ExploreSkillPullGiant()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExploreSkillPullGiant(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ExploreSkillPullGiant()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  pullTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  actions(t, i) {
    var l = this.bb.__offset(this.bb_pos, 8);
    return l
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + l) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startExploreSkillPullGiant(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPullTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createActionsVector(i, l) {
    i.startVector(4, l.length, 4);
    for (let t = l.length - 1; 0 <= t; t--) i.addOffset(l[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endExploreSkillPullGiant(t) {
    return t.endObject();
  }
  static createExploreSkillPullGiant(t, i, l, e) {
    return (
      ExploreSkillPullGiant.startExploreSkillPullGiant(t),
      ExploreSkillPullGiant.addType(t, i),
      ExploreSkillPullGiant.addPullTime(t, l),
      ExploreSkillPullGiant.addActions(t, e),
      ExploreSkillPullGiant.endExploreSkillPullGiant(t)
    );
  }
}
exports.ExploreSkillPullGiant = ExploreSkillPullGiant;
//# sourceMappingURL=explore-skill-pull-giant.js.map
