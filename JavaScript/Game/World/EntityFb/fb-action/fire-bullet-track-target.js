"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FireBulletTrackTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class FireBulletTrackTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFireBulletTrackTarget(t, e) {
    return (e || new FireBulletTrackTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFireBulletTrackTarget(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FireBulletTrackTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  launcherType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  launcher(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startFireBulletTrackTarget(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
  }
  static addLauncherType(t, e) {
    t.addFieldInt8(2, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLauncher(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(4, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endFireBulletTrackTarget(t) {
    return t.endObject();
  }
  static createFireBulletTrackTarget(t, e, r, i, a, s, u) {
    return (
      FireBulletTrackTarget.startFireBulletTrackTarget(t),
      FireBulletTrackTarget.addType(t, e),
      FireBulletTrackTarget.addBulletId(t, r),
      FireBulletTrackTarget.addLauncherType(t, i),
      FireBulletTrackTarget.addLauncher(t, a),
      FireBulletTrackTarget.addTargetType(t, s),
      FireBulletTrackTarget.addTarget(t, u),
      FireBulletTrackTarget.endFireBulletTrackTarget(t)
    );
  }
}
exports.FireBulletTrackTarget = FireBulletTrackTarget;
//# sourceMappingURL=fire-bullet-track-target.js.map
