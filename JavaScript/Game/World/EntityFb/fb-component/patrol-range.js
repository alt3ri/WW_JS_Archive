"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PatrolRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPatrolRange(t, e) {
    return (e || new PatrolRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrolRange(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PatrolRange()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  center(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startPatrolRange(t) {
    t.startObject(2);
  }
  static addCenter(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRadius(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endPatrolRange(t) {
    return t.endObject();
  }
  static createPatrolRange(t, e, r) {
    return (
      PatrolRange.startPatrolRange(t),
      PatrolRange.addCenter(t, e),
      PatrolRange.addRadius(t, r),
      PatrolRange.endPatrolRange(t)
    );
  }
}
exports.PatrolRange = PatrolRange;
//# sourceMappingURL=patrol-range.js.map
