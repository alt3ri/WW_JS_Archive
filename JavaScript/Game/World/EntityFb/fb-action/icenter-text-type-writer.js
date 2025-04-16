"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ICenterTextTypeWriter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ICenterTextTypeWriter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsICenterTextTypeWriter(e, t) {
    return (t || new ICenterTextTypeWriter()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsICenterTextTypeWriter(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ICenterTextTypeWriter()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  textCountPerSecond() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startICenterTextTypeWriter(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTextCountPerSecond(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endICenterTextTypeWriter(e) {
    return e.endObject();
  }
  static createICenterTextTypeWriter(e, t, r) {
    return (
      ICenterTextTypeWriter.startICenterTextTypeWriter(e),
      ICenterTextTypeWriter.addType(e, t),
      ICenterTextTypeWriter.addTextCountPerSecond(e, r),
      ICenterTextTypeWriter.endICenterTextTypeWriter(e)
    );
  }
}
exports.ICenterTextTypeWriter = ICenterTextTypeWriter;
//# sourceMappingURL=icenter-text-type-writer.js.map
