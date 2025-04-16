"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FloatValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FloatValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFloatValue(t, e) {
    return (e || new FloatValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFloatValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FloatValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startFloatValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static endFloatValue(t) {
    return t.endObject();
  }
  static createFloatValue(t, e) {
    return (
      FloatValue.startFloatValue(t),
      FloatValue.addV(t, e),
      FloatValue.endFloatValue(t)
    );
  }
}
exports.FloatValue = FloatValue;
//# sourceMappingURL=float-value.js.map
