"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FireBulletAddBuff = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class FireBulletAddBuff {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFireBulletAddBuff(t, e) {
    return (e || new FireBulletAddBuff()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFireBulletAddBuff(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FireBulletAddBuff()).__init(
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
  bulletOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startFireBulletAddBuff(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
  }
  static addBulletOffset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endFireBulletAddBuff(t) {
    return t.endObject();
  }
}
exports.FireBulletAddBuff = FireBulletAddBuff;
//# sourceMappingURL=fire-bullet-add-buff.js.map
