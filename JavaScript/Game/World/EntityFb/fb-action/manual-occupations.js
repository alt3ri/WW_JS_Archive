"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManualOccupations = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ManualOccupations {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsManualOccupations(t, a) {
    return (a || new ManualOccupations()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsManualOccupations(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ManualOccupations()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  occupationType(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  occupations(t, a) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, a)
      : void 0;
  }
  occupationsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startManualOccupations(t) {
    t.startObject(2);
  }
  static addOccupationType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addOccupations(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static createOccupationsVector(a, s) {
    a.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) a.addOffset(s[t]);
    return a.endVector();
  }
  static startOccupationsVector(t, a) {
    t.startVector(4, a, 4);
  }
  static endManualOccupations(t) {
    return t.endObject();
  }
  static createManualOccupations(t, a, s) {
    return (
      ManualOccupations.startManualOccupations(t),
      ManualOccupations.addOccupationType(t, a),
      ManualOccupations.addOccupations(t, s),
      ManualOccupations.endManualOccupations(t)
    );
  }
}
exports.ManualOccupations = ManualOccupations;
//# sourceMappingURL=manual-occupations.js.map
