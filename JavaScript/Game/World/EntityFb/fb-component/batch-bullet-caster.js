"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BatchBulletCaster = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BatchBulletCaster {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBatchBulletCaster(t, e) {
    return (e || new BatchBulletCaster()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBatchBulletCaster(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BatchBulletCaster()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  bulletIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  bulletType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  flyTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  flyDistance() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  warningTime() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  warningWidth() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBatchBulletCaster(t) {
    t.startObject(7);
  }
  static addBulletIndex(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addBulletType(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
  }
  static addDelayTime(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addFlyTime(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addFlyDistance(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addWarningTime(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addWarningWidth(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static endBatchBulletCaster(t) {
    return t.endObject();
  }
  static createBatchBulletCaster(t, e, s, a, i, r, l, h) {
    return (
      BatchBulletCaster.startBatchBulletCaster(t),
      BatchBulletCaster.addBulletIndex(t, e),
      BatchBulletCaster.addBulletType(t, s),
      BatchBulletCaster.addDelayTime(t, a),
      BatchBulletCaster.addFlyTime(t, i),
      BatchBulletCaster.addFlyDistance(t, r),
      BatchBulletCaster.addWarningTime(t, l),
      BatchBulletCaster.addWarningWidth(t, h),
      BatchBulletCaster.endBatchBulletCaster(t)
    );
  }
}
exports.BatchBulletCaster = BatchBulletCaster;
//# sourceMappingURL=batch-bullet-caster.js.map
