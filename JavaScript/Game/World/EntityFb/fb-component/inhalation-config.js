"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhalationConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  inhalation_matching_js_1 = require("../fb-component/inhalation-matching.js"),
  union_inhalation_performance_js_1 = require("../fb-component/union-inhalation-performance.js");
class InhalationConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(n, i) {
    return (this.bb_pos = n), (this.bb = i), this;
  }
  static getRootAsInhalationConfig(n, i) {
    return (i || new InhalationConfig()).__init(
      n.readInt32(n.position()) + n.position(),
      n,
    );
  }
  static getSizePrefixedRootAsInhalationConfig(n, i) {
    return (
      n.setPosition(n.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InhalationConfig()).__init(
        n.readInt32(n.position()) + n.position(),
        n,
      )
    );
  }
  inhalationMatching(n) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (n || new inhalation_matching_js_1.InhalationMatching()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  inhalationPerformanceType() {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? this.bb.readUint8(this.bb_pos + n)
      : union_inhalation_performance_js_1.UnionInhalationPerformance.NONE;
  }
  inhalationPerformance(n) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(n, this.bb_pos + i) : void 0;
  }
  static startInhalationConfig(n) {
    n.startObject(3);
  }
  static addInhalationMatching(n, i) {
    n.addFieldOffset(0, i, 0);
  }
  static addInhalationPerformanceType(n, i) {
    n.addFieldInt8(
      1,
      i,
      union_inhalation_performance_js_1.UnionInhalationPerformance.NONE,
    );
  }
  static addInhalationPerformance(n, i) {
    n.addFieldOffset(2, i, 0);
  }
  static endInhalationConfig(n) {
    return n.endObject();
  }
  static createInhalationConfig(n, i, t, a) {
    return (
      InhalationConfig.startInhalationConfig(n),
      InhalationConfig.addInhalationMatching(n, i),
      InhalationConfig.addInhalationPerformanceType(n, t),
      InhalationConfig.addInhalationPerformance(n, a),
      InhalationConfig.endInhalationConfig(n)
    );
  }
}
exports.InhalationConfig = InhalationConfig;
//# sourceMappingURL=inhalation-config.js.map
