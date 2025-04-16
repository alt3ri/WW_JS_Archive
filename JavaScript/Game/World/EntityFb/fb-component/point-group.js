"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PointGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_point_group_js_1 = require("../fb-component/union-point-group.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PointGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPointGroup(t, i) {
    return (i || new PointGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPointGroup(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PointGroup()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  groupConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_point_group_js_1.UnionPointGroup.NONE;
  }
  groupConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  points(t, i) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o
      ? (i || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPointGroup(t) {
    t.startObject(3);
  }
  static addGroupConfigType(t, i) {
    t.addFieldInt8(0, i, union_point_group_js_1.UnionPointGroup.NONE);
  }
  static addGroupConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addPoints(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createPointsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addOffset(o[t]);
    return i.endVector();
  }
  static startPointsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endPointGroup(t) {
    return t.endObject();
  }
  static createPointGroup(t, i, o, r) {
    return (
      PointGroup.startPointGroup(t),
      PointGroup.addGroupConfigType(t, i),
      PointGroup.addGroupConfig(t, o),
      PointGroup.addPoints(t, r),
      PointGroup.endPointGroup(t)
    );
  }
}
exports.PointGroup = PointGroup;
//# sourceMappingURL=point-group.js.map
