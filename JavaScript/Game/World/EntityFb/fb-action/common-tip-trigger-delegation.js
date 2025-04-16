"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipTriggerDelegation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipTriggerDelegation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCommonTipTriggerDelegation(i, t) {
    return (t || new CommonTipTriggerDelegation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCommonTipTriggerDelegation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CommonTipTriggerDelegation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readUint8(this.bb_pos + i) : 0;
  }
  tidMainText(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  tidSubText(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startCommonTipTriggerDelegation(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static addTidMainText(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addTidSubText(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCommonTipTriggerDelegation(i) {
    return i.endObject();
  }
  static createCommonTipTriggerDelegation(i, t, e, r) {
    return (
      CommonTipTriggerDelegation.startCommonTipTriggerDelegation(i),
      CommonTipTriggerDelegation.addType(i, t),
      CommonTipTriggerDelegation.addTidMainText(i, e),
      CommonTipTriggerDelegation.addTidSubText(i, r),
      CommonTipTriggerDelegation.endCommonTipTriggerDelegation(i)
    );
  }
}
exports.CommonTipTriggerDelegation = CommonTipTriggerDelegation;
//# sourceMappingURL=common-tip-trigger-delegation.js.map
