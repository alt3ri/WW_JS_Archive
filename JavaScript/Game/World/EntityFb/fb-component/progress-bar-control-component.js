"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProgressBarControlComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  aim_part_js_1 = require("../fb-component/aim-part.js"),
  hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js"),
  union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js"),
  union_progress_bar_control_js_1 = require("../fb-component/union-progress-bar-control.js");
class ProgressBarControlComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsProgressBarControlComponent(t, i) {
    return (i || new ProgressBarControlComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsProgressBarControlComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ProgressBarControlComponent()).__init(
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
    var r = this.bb.__offset(this.bb_pos, 14);
    return r
      ? (i || new aim_part_js_1.AimPart()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  aimPartsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  controlType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_progress_bar_control_js_1.UnionProgressBarControl.NONE;
  }
  control(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startProgressBarControlComponent(t) {
    t.startObject(8);
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
  static createAimPartsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startAimPartsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addControlType(t, i) {
    t.addFieldInt8(
      6,
      i,
      union_progress_bar_control_js_1.UnionProgressBarControl.NONE,
    );
  }
  static addControl(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endProgressBarControlComponent(t) {
    return t.endObject();
  }
}
exports.ProgressBarControlComponent = ProgressBarControlComponent;
//# sourceMappingURL=progress-bar-control-component.js.map
