"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FireBulletTrackPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class FireBulletTrackPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFireBulletTrackPosition(t, i) {
    return (i || new FireBulletTrackPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFireBulletTrackPosition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FireBulletTrackPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
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
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFireBulletTrackPosition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addLauncherType(t, i) {
    t.addFieldInt8(2, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLauncher(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addPositionEntityId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endFireBulletTrackPosition(t) {
    return t.endObject();
  }
  static createFireBulletTrackPosition(t, i, e, r, s, n) {
    return (
      FireBulletTrackPosition.startFireBulletTrackPosition(t),
      FireBulletTrackPosition.addType(t, i),
      FireBulletTrackPosition.addBulletId(t, e),
      FireBulletTrackPosition.addLauncherType(t, r),
      FireBulletTrackPosition.addLauncher(t, s),
      FireBulletTrackPosition.addPositionEntityId(t, n),
      FireBulletTrackPosition.endFireBulletTrackPosition(t)
    );
  }
}
exports.FireBulletTrackPosition = FireBulletTrackPosition;
//# sourceMappingURL=fire-bullet-track-position.js.map
