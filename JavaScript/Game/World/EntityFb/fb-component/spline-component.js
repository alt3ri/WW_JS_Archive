"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_spline_option_js_1 = require("../fb-component/union-spline-option.js");
class SplineComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsSplineComponent(t, n) {
    return (n || new SplineComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSplineComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new SplineComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spline_option_js_1.UnionSplineOption.NONE;
  }
  option(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startSplineComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addOptionType(t, n) {
    t.addFieldInt8(1, n, union_spline_option_js_1.UnionSplineOption.NONE);
  }
  static addOption(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static endSplineComponent(t) {
    return t.endObject();
  }
  static createSplineComponent(t, n, e, i) {
    return (
      SplineComponent.startSplineComponent(t),
      SplineComponent.addDisabled(t, n),
      SplineComponent.addOptionType(t, e),
      SplineComponent.addOption(t, i),
      SplineComponent.endSplineComponent(t)
    );
  }
}
exports.SplineComponent = SplineComponent;
//# sourceMappingURL=spline-component.js.map
