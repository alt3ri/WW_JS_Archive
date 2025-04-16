"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleScanSplineEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleScanSplineEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsToggleScanSplineEffect(e, t) {
    return (t || new ToggleScanSplineEffect()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsToggleScanSplineEffect(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ToggleScanSplineEffect()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startToggleScanSplineEffect(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endToggleScanSplineEffect(e) {
    return e.endObject();
  }
  static createToggleScanSplineEffect(e, t) {
    return (
      ToggleScanSplineEffect.startToggleScanSplineEffect(e),
      ToggleScanSplineEffect.addType(e, t),
      ToggleScanSplineEffect.endToggleScanSplineEffect(e)
    );
  }
}
exports.ToggleScanSplineEffect = ToggleScanSplineEffect;
//# sourceMappingURL=toggle-scan-spline-effect.js.map
