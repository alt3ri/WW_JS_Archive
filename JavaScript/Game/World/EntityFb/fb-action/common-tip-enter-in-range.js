"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipEnterInRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipEnterInRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsCommonTipEnterInRange(t, n) {
    return (n || new CommonTipEnterInRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCommonTipEnterInRange(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new CommonTipEnterInRange()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  tidText(t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n ? this.bb.__string(this.bb_pos + n, t) : void 0;
  }
  static startCommonTipEnterInRange(t) {
    t.startObject(2);
  }
  static addType(t, n) {
    t.addFieldInt8(0, n, 0);
  }
  static addTidText(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static endCommonTipEnterInRange(t) {
    return t.endObject();
  }
  static createCommonTipEnterInRange(t, n, e) {
    return (
      CommonTipEnterInRange.startCommonTipEnterInRange(t),
      CommonTipEnterInRange.addType(t, n),
      CommonTipEnterInRange.addTidText(t, e),
      CommonTipEnterInRange.endCommonTipEnterInRange(t)
    );
  }
}
exports.CommonTipEnterInRange = CommonTipEnterInRange;
//# sourceMappingURL=common-tip-enter-in-range.js.map
