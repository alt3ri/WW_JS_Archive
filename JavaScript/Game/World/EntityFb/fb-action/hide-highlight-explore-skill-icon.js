"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideHighlightExploreSkillIcon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideHighlightExploreSkillIcon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsHideHighlightExploreSkillIcon(i, t) {
    return (t || new HideHighlightExploreSkillIcon()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsHideHighlightExploreSkillIcon(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HideHighlightExploreSkillIcon()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startHideHighlightExploreSkillIcon(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endHideHighlightExploreSkillIcon(i) {
    return i.endObject();
  }
  static createHideHighlightExploreSkillIcon(i, t) {
    return (
      HideHighlightExploreSkillIcon.startHideHighlightExploreSkillIcon(i),
      HideHighlightExploreSkillIcon.addType(i, t),
      HideHighlightExploreSkillIcon.endHideHighlightExploreSkillIcon(i)
    );
  }
}
exports.HideHighlightExploreSkillIcon = HideHighlightExploreSkillIcon;
//# sourceMappingURL=hide-highlight-explore-skill-icon.js.map
