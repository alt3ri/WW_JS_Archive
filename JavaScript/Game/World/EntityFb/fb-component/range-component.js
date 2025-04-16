"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_trigger_shape_js_1 = require("../fb-shape/union-trigger-shape.js");
class RangeComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRangeComponent(t, e) {
    return (e || new RangeComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRangeComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RangeComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  shapeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_trigger_shape_js_1.UnionTriggerShape.NONE;
  }
  shape(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  extraRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startRangeComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addShapeType(t, e) {
    t.addFieldInt8(1, e, union_trigger_shape_js_1.UnionTriggerShape.NONE);
  }
  static addShape(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addExtraRange(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endRangeComponent(t) {
    return t.endObject();
  }
  static createRangeComponent(t, e, n, s, a) {
    return (
      RangeComponent.startRangeComponent(t),
      RangeComponent.addDisabled(t, e),
      RangeComponent.addShapeType(t, n),
      RangeComponent.addShape(t, s),
      RangeComponent.addExtraRange(t, a),
      RangeComponent.endRangeComponent(t)
    );
  }
}
exports.RangeComponent = RangeComponent;
//# sourceMappingURL=range-component.js.map
