"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTipId = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipId {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCommonTipId(t, i) {
    return (i || new CommonTipId()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCommonTipId(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CommonTipId()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCommonTipId(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endCommonTipId(t) {
    return t.endObject();
  }
  static createCommonTipId(t, i, o) {
    return (
      CommonTipId.startCommonTipId(t),
      CommonTipId.addType(t, i),
      CommonTipId.addId(t, o),
      CommonTipId.endCommonTipId(t)
    );
  }
}
exports.CommonTipId = CommonTipId;
//# sourceMappingURL=common-tip-id.js.map
