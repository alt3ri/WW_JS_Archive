"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipFirstComplete = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipFirstComplete {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCommonTipFirstComplete(t, e) {
    return (e || new CommonTipFirstComplete()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCommonTipFirstComplete(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CommonTipFirstComplete()).__init(
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
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCommonTipFirstComplete(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addTidText(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCommonTipFirstComplete(t) {
    return t.endObject();
  }
  static createCommonTipFirstComplete(t, e, i) {
    return (
      CommonTipFirstComplete.startCommonTipFirstComplete(t),
      CommonTipFirstComplete.addType(t, e),
      CommonTipFirstComplete.addTidText(t, i),
      CommonTipFirstComplete.endCommonTipFirstComplete(t)
    );
  }
}
exports.CommonTipFirstComplete = CommonTipFirstComplete;
//# sourceMappingURL=common-tip-first-complete.js.map
