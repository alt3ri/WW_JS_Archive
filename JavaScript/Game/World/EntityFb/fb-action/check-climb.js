"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckClimb = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CheckClimb {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckClimb(t, e) {
    return (e || new CheckClimb()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckClimb(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckClimb()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  direction(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCheckClimb(t) {
    t.startObject(2);
  }
  static addDirection(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDistance(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endCheckClimb(t) {
    return t.endObject();
  }
  static createCheckClimb(t, e, i) {
    return (
      CheckClimb.startCheckClimb(t),
      CheckClimb.addDirection(t, e),
      CheckClimb.addDistance(t, i),
      CheckClimb.endCheckClimb(t)
    );
  }
}
exports.CheckClimb = CheckClimb;
//# sourceMappingURL=check-climb.js.map
