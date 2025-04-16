"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipPrepareCountdown = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipPrepareCountdown {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsCommonTipPrepareCountdown(o, t) {
    return (t || new CommonTipPrepareCountdown()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsCommonTipPrepareCountdown(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CommonTipPrepareCountdown()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  type() {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.readUint8(this.bb_pos + o) : 0;
  }
  static startCommonTipPrepareCountdown(o) {
    o.startObject(1);
  }
  static addType(o, t) {
    o.addFieldInt8(0, t, 0);
  }
  static endCommonTipPrepareCountdown(o) {
    return o.endObject();
  }
  static createCommonTipPrepareCountdown(o, t) {
    return (
      CommonTipPrepareCountdown.startCommonTipPrepareCountdown(o),
      CommonTipPrepareCountdown.addType(o, t),
      CommonTipPrepareCountdown.endCommonTipPrepareCountdown(o)
    );
  }
}
exports.CommonTipPrepareCountdown = CommonTipPrepareCountdown;
//# sourceMappingURL=common-tip-prepare-countdown.js.map
