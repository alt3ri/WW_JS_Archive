"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForceOccupations = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ForceOccupations {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, c) {
    return (this.bb_pos = t), (this.bb = c), this;
  }
  static getRootAsForceOccupations(t, c) {
    return (c || new ForceOccupations()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsForceOccupations(t, c) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (c || new ForceOccupations()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  occupationType(t) {
    var c = this.bb.__offset(this.bb_pos, 4);
    return c ? this.bb.__string(this.bb_pos + c, t) : void 0;
  }
  occupations(t, c) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, c)
      : void 0;
  }
  occupationsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startForceOccupations(t) {
    t.startObject(2);
  }
  static addOccupationType(t, c) {
    t.addFieldOffset(0, c, 0);
  }
  static addOccupations(t, c) {
    t.addFieldOffset(1, c, 0);
  }
  static createOccupationsVector(c, s) {
    c.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) c.addOffset(s[t]);
    return c.endVector();
  }
  static startOccupationsVector(t, c) {
    t.startVector(4, c, 4);
  }
  static endForceOccupations(t) {
    return t.endObject();
  }
  static createForceOccupations(t, c, s) {
    return (
      ForceOccupations.startForceOccupations(t),
      ForceOccupations.addOccupationType(t, c),
      ForceOccupations.addOccupations(t, s),
      ForceOccupations.endForceOccupations(t)
    );
  }
}
exports.ForceOccupations = ForceOccupations;
//# sourceMappingURL=force-occupations.js.map
