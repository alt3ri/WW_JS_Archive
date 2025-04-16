"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillStatueInteractPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillStatueInteractPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsExploreSkillStatueInteractPoint(t, i) {
    return (i || new ExploreSkillStatueInteractPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExploreSkillStatueInteractPoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ExploreSkillStatueInteractPoint()).__init(
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
  hangingPointList(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.__string(this.bb.__vector(this.bb_pos + e) + 4 * t, i)
      : void 0;
  }
  hangingPointListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startExploreSkillStatueInteractPoint(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPullTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addHangingPointList(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createHangingPointListVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startHangingPointListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endExploreSkillStatueInteractPoint(t) {
    return t.endObject();
  }
  static createExploreSkillStatueInteractPoint(t, i, e, r) {
    return (
      ExploreSkillStatueInteractPoint.startExploreSkillStatueInteractPoint(t),
      ExploreSkillStatueInteractPoint.addType(t, i),
      ExploreSkillStatueInteractPoint.addPullTime(t, e),
      ExploreSkillStatueInteractPoint.addHangingPointList(t, r),
      ExploreSkillStatueInteractPoint.endExploreSkillStatueInteractPoint(t)
    );
  }
}
exports.ExploreSkillStatueInteractPoint = ExploreSkillStatueInteractPoint;
//# sourceMappingURL=explore-skill-statue-interact-point.js.map
