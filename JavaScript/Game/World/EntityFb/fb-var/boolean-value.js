"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BooleanValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BooleanValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsBooleanValue(e, t) {
    return (t || new BooleanValue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsBooleanValue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BooleanValue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  v() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startBooleanValue(e) {
    e.startObject(1);
  }
  static addV(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static endBooleanValue(e) {
    return e.endObject();
  }
  static createBooleanValue(e, t) {
    return (
      BooleanValue.startBooleanValue(e),
      BooleanValue.addV(e, t),
      BooleanValue.endBooleanValue(e)
    );
  }
}
exports.BooleanValue = BooleanValue;
//# sourceMappingURL=boolean-value.js.map
