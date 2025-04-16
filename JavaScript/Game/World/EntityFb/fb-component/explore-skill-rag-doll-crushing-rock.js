"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillRagDollCrushingRock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillRagDollCrushingRock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(l, r) {
    return (this.bb_pos = l), (this.bb = r), this;
  }
  static getRootAsExploreSkillRagDollCrushingRock(l, r) {
    return (r || new ExploreSkillRagDollCrushingRock()).__init(
      l.readInt32(l.position()) + l.position(),
      l,
    );
  }
  static getSizePrefixedRootAsExploreSkillRagDollCrushingRock(l, r) {
    return (
      l.setPosition(l.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ExploreSkillRagDollCrushingRock()).__init(
        l.readInt32(l.position()) + l.position(),
        l,
      )
    );
  }
  type(l) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, l) : void 0;
  }
  static startExploreSkillRagDollCrushingRock(l) {
    l.startObject(1);
  }
  static addType(l, r) {
    l.addFieldOffset(0, r, 0);
  }
  static endExploreSkillRagDollCrushingRock(l) {
    return l.endObject();
  }
  static createExploreSkillRagDollCrushingRock(l, r) {
    return (
      ExploreSkillRagDollCrushingRock.startExploreSkillRagDollCrushingRock(l),
      ExploreSkillRagDollCrushingRock.addType(l, r),
      ExploreSkillRagDollCrushingRock.endExploreSkillRagDollCrushingRock(l)
    );
  }
}
exports.ExploreSkillRagDollCrushingRock = ExploreSkillRagDollCrushingRock;
//# sourceMappingURL=explore-skill-rag-doll-crushing-rock.js.map
