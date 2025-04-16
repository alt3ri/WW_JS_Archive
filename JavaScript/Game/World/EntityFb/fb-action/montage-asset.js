"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MontageAsset = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MontageAsset {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMontageAsset(t, s) {
    return (s || new MontageAsset()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMontageAsset(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MontageAsset()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  asset(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startMontageAsset(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addAsset(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endMontageAsset(t) {
    return t.endObject();
  }
  static createMontageAsset(t, s, e) {
    return (
      MontageAsset.startMontageAsset(t),
      MontageAsset.addType(t, s),
      MontageAsset.addAsset(t, e),
      MontageAsset.endMontageAsset(t)
    );
  }
}
exports.MontageAsset = MontageAsset;
//# sourceMappingURL=montage-asset.js.map
