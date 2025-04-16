"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowHighlightExploreSkillIcon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowHighlightExploreSkillIcon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsShowHighlightExploreSkillIcon(i, t) {
    return (t || new ShowHighlightExploreSkillIcon()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsShowHighlightExploreSkillIcon(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ShowHighlightExploreSkillIcon()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  skillType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  duration() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  isSwitchBack() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startShowHighlightExploreSkillIcon(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSkillType(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addDuration(i, t) {
    i.addFieldFloat32(2, t, 0);
  }
  static addIsSwitchBack(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endShowHighlightExploreSkillIcon(i) {
    return i.endObject();
  }
  static createShowHighlightExploreSkillIcon(i, t, l, h, o) {
    return (
      ShowHighlightExploreSkillIcon.startShowHighlightExploreSkillIcon(i),
      ShowHighlightExploreSkillIcon.addType(i, t),
      ShowHighlightExploreSkillIcon.addSkillType(i, l),
      ShowHighlightExploreSkillIcon.addDuration(i, h),
      ShowHighlightExploreSkillIcon.addIsSwitchBack(i, o),
      ShowHighlightExploreSkillIcon.endShowHighlightExploreSkillIcon(i)
    );
  }
}
exports.ShowHighlightExploreSkillIcon = ShowHighlightExploreSkillIcon;
//# sourceMappingURL=show-highlight-explore-skill-icon.js.map
