"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AcmLimited = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcmLimited {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAcmLimited(t, i) {
    return (i || new AcmLimited()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAcmLimited(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AcmLimited()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  limitValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAcmLimited(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addLimitValue(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endAcmLimited(t) {
    return t.endObject();
  }
  static createAcmLimited(t, i, e) {
    return (
      AcmLimited.startAcmLimited(t),
      AcmLimited.addType(t, i),
      AcmLimited.addLimitValue(t, e),
      AcmLimited.endAcmLimited(t)
    );
  }
}
exports.AcmLimited = AcmLimited;
//# sourceMappingURL=acm-limited.js.map
