"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipGeneralFloatingTip = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipGeneralFloatingTip {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCommonTipGeneralFloatingTip(i, t) {
    return (t || new CommonTipGeneralFloatingTip()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCommonTipGeneralFloatingTip(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CommonTipGeneralFloatingTip()).__init(
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
  static startCommonTipGeneralFloatingTip(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static addTidMainText(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endCommonTipGeneralFloatingTip(i) {
    return i.endObject();
  }
  static createCommonTipGeneralFloatingTip(i, t, e) {
    return (
      CommonTipGeneralFloatingTip.startCommonTipGeneralFloatingTip(i),
      CommonTipGeneralFloatingTip.addType(i, t),
      CommonTipGeneralFloatingTip.addTidMainText(i, e),
      CommonTipGeneralFloatingTip.endCommonTipGeneralFloatingTip(i)
    );
  }
}
exports.CommonTipGeneralFloatingTip = CommonTipGeneralFloatingTip;
//# sourceMappingURL=common-tip-general-floating-tip.js.map
