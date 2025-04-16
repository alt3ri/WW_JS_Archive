"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStyleWeakSignal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleWeakSignal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsHeadStyleWeakSignal(e, t) {
    return (t || new HeadStyleWeakSignal()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsHeadStyleWeakSignal(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HeadStyleWeakSignal()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startHeadStyleWeakSignal(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endHeadStyleWeakSignal(e) {
    return e.endObject();
  }
  static createHeadStyleWeakSignal(e, t) {
    return (
      HeadStyleWeakSignal.startHeadStyleWeakSignal(e),
      HeadStyleWeakSignal.addType(e, t),
      HeadStyleWeakSignal.endHeadStyleWeakSignal(e)
    );
  }
}
exports.HeadStyleWeakSignal = HeadStyleWeakSignal;
//# sourceMappingURL=head-style-weak-signal.js.map
