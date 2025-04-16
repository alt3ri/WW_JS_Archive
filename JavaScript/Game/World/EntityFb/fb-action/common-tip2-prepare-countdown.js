"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTip2PrepareCountdown = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTip2PrepareCountdown {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsCommonTip2PrepareCountdown(t, o) {
    return (o || new CommonTip2PrepareCountdown()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCommonTip2PrepareCountdown(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new CommonTip2PrepareCountdown()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  countDownNum() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tidCountDownTxt(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  isBlockPlayer() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCommonTip2PrepareCountdown(t) {
    t.startObject(4);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addCountDownNum(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static addTidCountDownTxt(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addIsBlockPlayer(t, o) {
    t.addFieldInt8(3, +o, 0);
  }
  static endCommonTip2PrepareCountdown(t) {
    return t.endObject();
  }
  static createCommonTip2PrepareCountdown(t, o, n, r, e) {
    return (
      CommonTip2PrepareCountdown.startCommonTip2PrepareCountdown(t),
      CommonTip2PrepareCountdown.addType(t, o),
      CommonTip2PrepareCountdown.addCountDownNum(t, n),
      CommonTip2PrepareCountdown.addTidCountDownTxt(t, r),
      CommonTip2PrepareCountdown.addIsBlockPlayer(t, e),
      CommonTip2PrepareCountdown.endCommonTip2PrepareCountdown(t)
    );
  }
}
exports.CommonTip2PrepareCountdown = CommonTip2PrepareCountdown;
//# sourceMappingURL=common-tip2-prepare-countdown.js.map
