"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoaringChallengeSettlement = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SoaringChallengeSettlement {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSoaringChallengeSettlement(e, t) {
    return (t || new SoaringChallengeSettlement()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSoaringChallengeSettlement(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SoaringChallengeSettlement()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startSoaringChallengeSettlement(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSoaringChallengeSettlement(e) {
    return e.endObject();
  }
  static createSoaringChallengeSettlement(e, t) {
    return (
      SoaringChallengeSettlement.startSoaringChallengeSettlement(e),
      SoaringChallengeSettlement.addType(e, t),
      SoaringChallengeSettlement.endSoaringChallengeSettlement(e)
    );
  }
}
exports.SoaringChallengeSettlement = SoaringChallengeSettlement;
//# sourceMappingURL=soaring-challenge-settlement.js.map
