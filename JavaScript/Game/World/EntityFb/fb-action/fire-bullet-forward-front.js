"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FireBulletForwardFront = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class FireBulletForwardFront {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsFireBulletForwardFront(t, r) {
    return (r || new FireBulletForwardFront()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFireBulletForwardFront(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new FireBulletForwardFront()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
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
    var r = this.bb.__offset(this.bb_pos, 10);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startFireBulletForwardFront(t) {
    t.startObject(4);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addBulletId(t, r) {
    t.addFieldInt64(1, r, BigInt("0"));
  }
  static addLauncherType(t, r) {
    t.addFieldInt8(2, r, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLauncher(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static endFireBulletForwardFront(t) {
    return t.endObject();
  }
  static createFireBulletForwardFront(t, r, e, i, s) {
    return (
      FireBulletForwardFront.startFireBulletForwardFront(t),
      FireBulletForwardFront.addType(t, r),
      FireBulletForwardFront.addBulletId(t, e),
      FireBulletForwardFront.addLauncherType(t, i),
      FireBulletForwardFront.addLauncher(t, s),
      FireBulletForwardFront.endFireBulletForwardFront(t)
    );
  }
}
exports.FireBulletForwardFront = FireBulletForwardFront;
//# sourceMappingURL=fire-bullet-forward-front.js.map
