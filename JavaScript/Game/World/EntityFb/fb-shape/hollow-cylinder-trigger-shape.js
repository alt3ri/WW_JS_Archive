"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HollowCylinderTriggerShape = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class HollowCylinderTriggerShape {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHollowCylinderTriggerShape(t, i) {
    return (i || new HollowCylinderTriggerShape()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHollowCylinderTriggerShape(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HollowCylinderTriggerShape()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  center(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  height() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  innerRadius() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startHollowCylinderTriggerShape(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCenter(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRadius(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addHeight(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addInnerRadius(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endHollowCylinderTriggerShape(t) {
    return t.endObject();
  }
}
exports.HollowCylinderTriggerShape = HollowCylinderTriggerShape;
//# sourceMappingURL=hollow-cylinder-trigger-shape.js.map
