"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableExploreSkill = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableExploreSkill {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDisableExploreSkill(t, e) {
    return (e || new DisableExploreSkill()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDisableExploreSkill(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DisableExploreSkill()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  placeTemporaryTeleport() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isComplementary() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  exploreSkillList(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  exploreSkillListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  exploreSkillListArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startDisableExploreSkill(t) {
    t.startObject(3);
  }
  static addPlaceTemporaryTeleport(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsComplementary(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addExploreSkillList(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createExploreSkillListVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startExploreSkillListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endDisableExploreSkill(t) {
    return t.endObject();
  }
  static createDisableExploreSkill(t, e, i, l) {
    return (
      DisableExploreSkill.startDisableExploreSkill(t),
      DisableExploreSkill.addPlaceTemporaryTeleport(t, e),
      DisableExploreSkill.addIsComplementary(t, i),
      DisableExploreSkill.addExploreSkillList(t, l),
      DisableExploreSkill.endDisableExploreSkill(t)
    );
  }
}
exports.DisableExploreSkill = DisableExploreSkill;
//# sourceMappingURL=disable-explore-skill.js.map
