"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitBulletTypeCrystalAttack = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class HitBulletTypeCrystalAttack {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitBulletTypeCrystalAttack(t, e) {
    return (e || new HitBulletTypeCrystalAttack()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitBulletTypeCrystalAttack(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitBulletTypeCrystalAttack()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  trackOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startHitBulletTypeCrystalAttack(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTrackOffset(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endHitBulletTypeCrystalAttack(t) {
    return t.endObject();
  }
}
exports.HitBulletTypeCrystalAttack = HitBulletTypeCrystalAttack;
//# sourceMappingURL=hit-bullet-type-crystal-attack.js.map
