"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityScanFunction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  scan_trace_effect_js_1 = require("../fb-component/scan-trace-effect.js");
class EntityScanFunction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsEntityScanFunction(t, n) {
    return (n || new EntityScanFunction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityScanFunction(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new EntityScanFunction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  scanId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isConcealed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  traceEffect(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (t || new scan_trace_effect_js_1.ScanTraceEffect()).__init(
          this.bb.__indirect(this.bb_pos + n),
          this.bb,
        )
      : void 0;
  }
  static startEntityScanFunction(t) {
    t.startObject(3);
  }
  static addScanId(t, n) {
    t.addFieldInt32(0, n, 0);
  }
  static addIsConcealed(t, n) {
    t.addFieldInt8(1, +n, 0);
  }
  static addTraceEffect(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static endEntityScanFunction(t) {
    return t.endObject();
  }
}
exports.EntityScanFunction = EntityScanFunction;
//# sourceMappingURL=entity-scan-function.js.map
