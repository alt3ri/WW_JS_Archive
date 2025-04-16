"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipReachChallenge = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipReachChallenge {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCommonTipReachChallenge(e, t) {
    return (t || new CommonTipReachChallenge()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCommonTipReachChallenge(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CommonTipReachChallenge()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  tidMainText(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCommonTipReachChallenge(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addTidMainText(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCommonTipReachChallenge(e) {
    return e.endObject();
  }
  static createCommonTipReachChallenge(e, t, i) {
    return (
      CommonTipReachChallenge.startCommonTipReachChallenge(e),
      CommonTipReachChallenge.addType(e, t),
      CommonTipReachChallenge.addTidMainText(e, i),
      CommonTipReachChallenge.endCommonTipReachChallenge(e)
    );
  }
}
exports.CommonTipReachChallenge = CommonTipReachChallenge;
//# sourceMappingURL=common-tip-reach-challenge.js.map
