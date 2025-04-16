"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillPullStatue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js");
class ExploreSkillPullStatue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsExploreSkillPullStatue(t, i) {
    return (i || new ExploreSkillPullStatue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExploreSkillPullStatue(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ExploreSkillPullStatue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (
          t || new category_matching_condition_js_1.CategoryMatchingCondition()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  statueInteractPointId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startExploreSkillPullStatue(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addStatueInteractPointId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endExploreSkillPullStatue(t) {
    return t.endObject();
  }
}
exports.ExploreSkillPullStatue = ExploreSkillPullStatue;
//# sourceMappingURL=explore-skill-pull-statue.js.map
