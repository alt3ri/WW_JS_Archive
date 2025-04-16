"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipChallengeFail = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipChallengeFail {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCommonTipChallengeFail(e, i) {
    return (i || new CommonTipChallengeFail()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCommonTipChallengeFail(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CommonTipChallengeFail()).__init(
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
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  static startCommonTipChallengeFail(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldInt8(0, i, 0);
  }
  static addTidMainText(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static endCommonTipChallengeFail(e) {
    return e.endObject();
  }
  static createCommonTipChallengeFail(e, i, t) {
    return (
      CommonTipChallengeFail.startCommonTipChallengeFail(e),
      CommonTipChallengeFail.addType(e, i),
      CommonTipChallengeFail.addTidMainText(e, t),
      CommonTipChallengeFail.endCommonTipChallengeFail(e)
    );
  }
}
exports.CommonTipChallengeFail = CommonTipChallengeFail;
//# sourceMappingURL=common-tip-challenge-fail.js.map
