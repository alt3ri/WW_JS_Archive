"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTraceEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ScanTraceEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsScanTraceEffect(t, e) {
    return (e || new ScanTraceEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsScanTraceEffect(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ScanTraceEffect()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  effect(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  target() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startScanTraceEffect(t) {
    t.startObject(2);
  }
  static addEffect(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTarget(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endScanTraceEffect(t) {
    return t.endObject();
  }
  static createScanTraceEffect(t, e, c) {
    return (
      ScanTraceEffect.startScanTraceEffect(t),
      ScanTraceEffect.addEffect(t, e),
      ScanTraceEffect.addTarget(t, c),
      ScanTraceEffect.endScanTraceEffect(t)
    );
  }
}
exports.ScanTraceEffect = ScanTraceEffect;
//# sourceMappingURL=scan-trace-effect.js.map
