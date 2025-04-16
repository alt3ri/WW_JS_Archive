"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSplineWholeLineMode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EffectSplineWholeLineMode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEffectSplineWholeLineMode(e, t) {
    return (t || new EffectSplineWholeLineMode()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEffectSplineWholeLineMode(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EffectSplineWholeLineMode()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startEffectSplineWholeLineMode(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEffectSplineWholeLineMode(e) {
    return e.endObject();
  }
  static createEffectSplineWholeLineMode(e, t) {
    return (
      EffectSplineWholeLineMode.startEffectSplineWholeLineMode(e),
      EffectSplineWholeLineMode.addType(e, t),
      EffectSplineWholeLineMode.endEffectSplineWholeLineMode(e)
    );
  }
}
exports.EffectSplineWholeLineMode = EffectSplineWholeLineMode;
//# sourceMappingURL=effect-spline-whole-line-mode.js.map
