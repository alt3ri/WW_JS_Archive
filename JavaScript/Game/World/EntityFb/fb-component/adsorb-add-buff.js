"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdsorbAddBuff = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AdsorbAddBuff {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAdsorbAddBuff(t, s) {
    return (s || new AdsorbAddBuff()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAdsorbAddBuff(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AdsorbAddBuff()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  speed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAdsorbAddBuff(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSpeed(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endAdsorbAddBuff(t) {
    return t.endObject();
  }
  static createAdsorbAddBuff(t, s, d) {
    return (
      AdsorbAddBuff.startAdsorbAddBuff(t),
      AdsorbAddBuff.addType(t, s),
      AdsorbAddBuff.addSpeed(t, d),
      AdsorbAddBuff.endAdsorbAddBuff(t)
    );
  }
}
exports.AdsorbAddBuff = AdsorbAddBuff;
//# sourceMappingURL=adsorb-add-buff.js.map
