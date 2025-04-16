"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FireBullet = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_fire_bullet_js_1 = require("../fb-action/union-fire-bullet.js");
class FireBullet {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFireBullet(t, e) {
    return (e || new FireBullet()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFireBullet(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FireBullet()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  typeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_fire_bullet_js_1.UnionFireBullet.NONE;
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startFireBullet(t) {
    t.startObject(2);
  }
  static addTypeType(t, e) {
    t.addFieldInt8(0, e, union_fire_bullet_js_1.UnionFireBullet.NONE);
  }
  static addType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFireBullet(t) {
    return t.endObject();
  }
  static createFireBullet(t, e, i) {
    return (
      FireBullet.startFireBullet(t),
      FireBullet.addTypeType(t, e),
      FireBullet.addType(t, i),
      FireBullet.endFireBullet(t)
    );
  }
}
exports.FireBullet = FireBullet;
//# sourceMappingURL=fire-bullet.js.map
