"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhaledPerformance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledPerformance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsInhaledPerformance(e, r) {
    return (r || new InhaledPerformance()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsInhaledPerformance(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new InhaledPerformance()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  inhaledTime() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startInhaledPerformance(e) {
    e.startObject(1);
  }
  static addInhaledTime(e, r) {
    e.addFieldFloat32(0, r, 0);
  }
  static endInhaledPerformance(e) {
    return e.endObject();
  }
  static createInhaledPerformance(e, r) {
    return (
      InhaledPerformance.startInhaledPerformance(e),
      InhaledPerformance.addInhaledTime(e, r),
      InhaledPerformance.endInhaledPerformance(e)
    );
  }
}
exports.InhaledPerformance = InhaledPerformance;
//# sourceMappingURL=inhaled-performance.js.map
