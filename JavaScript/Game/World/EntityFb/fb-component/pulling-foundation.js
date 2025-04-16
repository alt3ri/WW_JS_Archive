"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PullingFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_pulling_foundation_js_1 = require("../fb-component/union-pulling-foundation.js");
class PullingFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, n) {
    return (this.bb_pos = i), (this.bb = n), this;
  }
  static getRootAsPullingFoundation(i, n) {
    return (n || new PullingFoundation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsPullingFoundation(i, n) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new PullingFoundation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  disabled() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_pulling_foundation_js_1.UnionPullingFoundation.NONE;
  }
  config(i) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(i, this.bb_pos + n) : void 0;
  }
  static startPullingFoundation(i) {
    i.startObject(3);
  }
  static addDisabled(i, n) {
    i.addFieldInt8(0, +n, 0);
  }
  static addConfigType(i, n) {
    i.addFieldInt8(
      1,
      n,
      union_pulling_foundation_js_1.UnionPullingFoundation.NONE,
    );
  }
  static addConfig(i, n) {
    i.addFieldOffset(2, n, 0);
  }
  static endPullingFoundation(i) {
    return i.endObject();
  }
  static createPullingFoundation(i, n, t, o) {
    return (
      PullingFoundation.startPullingFoundation(i),
      PullingFoundation.addDisabled(i, n),
      PullingFoundation.addConfigType(i, t),
      PullingFoundation.addConfig(i, o),
      PullingFoundation.endPullingFoundation(i)
    );
  }
}
exports.PullingFoundation = PullingFoundation;
//# sourceMappingURL=pulling-foundation.js.map
