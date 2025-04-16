"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillRagDollDestroySolidRock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillRagDollDestroySolidRock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(l, o) {
    return (this.bb_pos = l), (this.bb = o), this;
  }
  static getRootAsExploreSkillRagDollDestroySolidRock(l, o) {
    return (o || new ExploreSkillRagDollDestroySolidRock()).__init(
      l.readInt32(l.position()) + l.position(),
      l,
    );
  }
  static getSizePrefixedRootAsExploreSkillRagDollDestroySolidRock(l, o) {
    return (
      l.setPosition(l.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ExploreSkillRagDollDestroySolidRock()).__init(
        l.readInt32(l.position()) + l.position(),
        l,
      )
    );
  }
  type(l) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, l) : void 0;
  }
  static startExploreSkillRagDollDestroySolidRock(l) {
    l.startObject(1);
  }
  static addType(l, o) {
    l.addFieldOffset(0, o, 0);
  }
  static endExploreSkillRagDollDestroySolidRock(l) {
    return l.endObject();
  }
  static createExploreSkillRagDollDestroySolidRock(l, o) {
    return (
      ExploreSkillRagDollDestroySolidRock.startExploreSkillRagDollDestroySolidRock(
        l,
      ),
      ExploreSkillRagDollDestroySolidRock.addType(l, o),
      ExploreSkillRagDollDestroySolidRock.endExploreSkillRagDollDestroySolidRock(
        l,
      )
    );
  }
}
exports.ExploreSkillRagDollDestroySolidRock =
  ExploreSkillRagDollDestroySolidRock;
//# sourceMappingURL=explore-skill-rag-doll-destroy-solid-rock.js.map
