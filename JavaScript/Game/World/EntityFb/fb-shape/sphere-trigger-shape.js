"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SphereTriggerShape = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class SphereTriggerShape {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSphereTriggerShape(e, t) {
    return (t || new SphereTriggerShape()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSphereTriggerShape(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SphereTriggerShape()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  center(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  radius() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startSphereTriggerShape(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCenter(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addRadius(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endSphereTriggerShape(e) {
    return e.endObject();
  }
}
exports.SphereTriggerShape = SphereTriggerShape;
//# sourceMappingURL=sphere-trigger-shape.js.map
