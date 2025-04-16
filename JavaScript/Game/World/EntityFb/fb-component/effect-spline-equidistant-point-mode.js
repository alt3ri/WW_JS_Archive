"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSplineEquidistantPointMode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EffectSplineEquidistantPointMode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEffectSplineEquidistantPointMode(t, i) {
    return (i || new EffectSplineEquidistantPointMode()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEffectSplineEquidistantPointMode(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EffectSplineEquidistantPointMode()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  space() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEffectSplineEquidistantPointMode(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSpace(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endEffectSplineEquidistantPointMode(t) {
    return t.endObject();
  }
  static createEffectSplineEquidistantPointMode(t, i, e) {
    return (
      EffectSplineEquidistantPointMode.startEffectSplineEquidistantPointMode(t),
      EffectSplineEquidistantPointMode.addType(t, i),
      EffectSplineEquidistantPointMode.addSpace(t, e),
      EffectSplineEquidistantPointMode.endEffectSplineEquidistantPointMode(t)
    );
  }
}
exports.EffectSplineEquidistantPointMode = EffectSplineEquidistantPointMode;
//# sourceMappingURL=effect-spline-equidistant-point-mode.js.map
