"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStyleWarning = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleWarning {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHeadStyleWarning(t, e) {
    return (e || new HeadStyleWarning()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHeadStyleWarning(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HeadStyleWarning()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startHeadStyleWarning(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endHeadStyleWarning(t) {
    return t.endObject();
  }
  static createHeadStyleWarning(t, e) {
    return (
      HeadStyleWarning.startHeadStyleWarning(t),
      HeadStyleWarning.addType(t, e),
      HeadStyleWarning.endHeadStyleWarning(t)
    );
  }
}
exports.HeadStyleWarning = HeadStyleWarning;
//# sourceMappingURL=head-style-warning.js.map
