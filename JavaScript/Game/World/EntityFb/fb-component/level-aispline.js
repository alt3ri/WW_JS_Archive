"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAISpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  level_aispline_point_js_1 = require("../fb-component/level-aispline-point.js"),
  union_level_ai_cycle_option_js_1 = require("../fb-component/union-level-ai-cycle-option.js");
class LevelAISpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelAISpline(e, t) {
    return (t || new LevelAISpline()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelAISpline(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelAISpline()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  cycleOptionType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_level_ai_cycle_option_js_1.UnionLevelAiCycleOption.NONE;
  }
  cycleOption(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  usePathFinding() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  isPassEveryKeyPoint() {
    var e = this.bb.__offset(this.bb_pos, 14);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  points(e, t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new level_aispline_point_js_1.LevelAISplinePoint()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startLevelAISpline(e) {
    e.startObject(7);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCycleOptionType(e, t) {
    e.addFieldInt8(
      2,
      t,
      union_level_ai_cycle_option_js_1.UnionLevelAiCycleOption.NONE,
    );
  }
  static addCycleOption(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addUsePathFinding(e, t) {
    e.addFieldInt8(4, +t, 0);
  }
  static addIsPassEveryKeyPoint(e, t) {
    e.addFieldInt8(5, +t, 0);
  }
  static addPoints(e, t) {
    e.addFieldOffset(6, t, 0);
  }
  static createPointsVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startPointsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelAISpline(e) {
    return e.endObject();
  }
  static createLevelAISpline(e, t, i, s, n, l, r, a) {
    return (
      LevelAISpline.startLevelAISpline(e),
      LevelAISpline.addType(e, t),
      LevelAISpline.addEntityId(e, i),
      LevelAISpline.addCycleOptionType(e, s),
      LevelAISpline.addCycleOption(e, n),
      LevelAISpline.addUsePathFinding(e, l),
      LevelAISpline.addIsPassEveryKeyPoint(e, r),
      LevelAISpline.addPoints(e, a),
      LevelAISpline.endLevelAISpline(e)
    );
  }
}
exports.LevelAISpline = LevelAISpline;
//# sourceMappingURL=level-aispline.js.map
