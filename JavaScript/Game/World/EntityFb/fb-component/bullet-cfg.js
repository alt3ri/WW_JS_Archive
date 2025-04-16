"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCfg = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BulletCfg {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBulletCfg(t, e) {
    return (e || new BulletCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBulletCfg(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BulletCfg()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  createConditionsType(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t) : 0;
  }
  createConditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  createConditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  createConditions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.__union(e, this.bb.__vector(this.bb_pos + i) + 4 * t)
      : void 0;
  }
  createConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startBulletCfg(t) {
    t.startObject(2);
  }
  static addCreateConditionsType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createCreateConditionsTypeVector(e, i) {
    e.startVector(1, i.length, 1);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt8(i[t]);
    return e.endVector();
  }
  static startCreateConditionsTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addCreateConditions(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createCreateConditionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startCreateConditionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endBulletCfg(t) {
    return t.endObject();
  }
  static createBulletCfg(t, e, i) {
    return (
      BulletCfg.startBulletCfg(t),
      BulletCfg.addCreateConditionsType(t, e),
      BulletCfg.addCreateConditions(t, i),
      BulletCfg.endBulletCfg(t)
    );
  }
}
exports.BulletCfg = BulletCfg;
//# sourceMappingURL=bullet-cfg.js.map
