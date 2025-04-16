"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BadBuKingChallengeTip = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BadBuKingChallengeTip {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsBadBuKingChallengeTip(e, i) {
    return (i || new BadBuKingChallengeTip()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsBadBuKingChallengeTip(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new BadBuKingChallengeTip()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  warningText(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  static startBadBuKingChallengeTip(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldInt8(0, i, 0);
  }
  static addWarningText(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static endBadBuKingChallengeTip(e) {
    return e.endObject();
  }
  static createBadBuKingChallengeTip(e, i, t) {
    return (
      BadBuKingChallengeTip.startBadBuKingChallengeTip(e),
      BadBuKingChallengeTip.addType(e, i),
      BadBuKingChallengeTip.addWarningText(e, t),
      BadBuKingChallengeTip.endBadBuKingChallengeTip(e)
    );
  }
}
exports.BadBuKingChallengeTip = BadBuKingChallengeTip;
//# sourceMappingURL=bad-bu-king-challenge-tip.js.map
