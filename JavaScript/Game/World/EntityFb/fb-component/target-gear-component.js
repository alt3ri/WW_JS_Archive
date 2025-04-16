"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TargetGearComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  aim_part_js_1 = require("../fb-component/aim-part.js"),
  hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js"),
  spline_move_js_1 = require("../fb-component/spline-move.js"),
  union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js"),
  union_hit_logic_type_js_1 = require("../fb-component/union-hit-logic-type.js");
class TargetGearComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTargetGearComponent(t, i) {
    return (i || new TargetGearComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTargetGearComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TargetGearComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hitBulletType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_hit_bullet_type_js_1.UnionHitBulletType.NONE;
  }
  hitBullet(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  attackerHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  victimHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  aimParts(t, i) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (i || new aim_part_js_1.AimPart()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  aimPartsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isCycle() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cycleInterval() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  cycleStates(t, i) {
    var e = this.bb.__offset(this.bb_pos, 22);
    return e
      ? this.bb.__string(this.bb.__vector(this.bb_pos + e) + 4 * t, i)
      : void 0;
  }
  cycleStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  hitLogicTypeType() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_hit_logic_type_js_1.UnionHitLogicType.NONE;
  }
  hitLogicType(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  patrol(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i
      ? (t || new spline_move_js_1.SplineMove()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  hitCd() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startTargetGearComponent(t) {
    t.startObject(14);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addHitBulletType(t, i) {
    t.addFieldInt8(1, i, union_hit_bullet_type_js_1.UnionHitBulletType.NONE);
  }
  static addHitBullet(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAttackerHitTimeScaleRatio(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addVictimHitTimeScaleRatio(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAimParts(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createAimPartsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startAimPartsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addType(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addIsCycle(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addCycleInterval(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addCycleStates(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static createCycleStatesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startCycleStatesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addHitLogicTypeType(t, i) {
    t.addFieldInt8(10, i, union_hit_logic_type_js_1.UnionHitLogicType.NONE);
  }
  static addHitLogicType(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addPatrol(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addHitCd(t, i) {
    t.addFieldFloat32(13, i, 0);
  }
  static endTargetGearComponent(t) {
    return t.endObject();
  }
}
exports.TargetGearComponent = TargetGearComponent;
//# sourceMappingURL=target-gear-component.js.map
