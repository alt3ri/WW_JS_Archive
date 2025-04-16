"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipChallengeSuccess = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipChallengeSuccess {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsCommonTipChallengeSuccess(e, s) {
    return (s || new CommonTipChallengeSuccess()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCommonTipChallengeSuccess(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CommonTipChallengeSuccess()).__init(
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
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  static startCommonTipChallengeSuccess(e) {
    e.startObject(2);
  }
  static addType(e, s) {
    e.addFieldInt8(0, s, 0);
  }
  static addTidMainText(e, s) {
    e.addFieldOffset(1, s, 0);
  }
  static endCommonTipChallengeSuccess(e) {
    return e.endObject();
  }
  static createCommonTipChallengeSuccess(e, s, t) {
    return (
      CommonTipChallengeSuccess.startCommonTipChallengeSuccess(e),
      CommonTipChallengeSuccess.addType(e, s),
      CommonTipChallengeSuccess.addTidMainText(e, t),
      CommonTipChallengeSuccess.endCommonTipChallengeSuccess(e)
    );
  }
}
exports.CommonTipChallengeSuccess = CommonTipChallengeSuccess;
//# sourceMappingURL=common-tip-challenge-success.js.map
