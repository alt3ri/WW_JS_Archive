"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractSectorRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractSectorRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractSectorRange(t, e) {
    return (e || new InteractSectorRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractSectorRange(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractSectorRange()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  begin() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  end() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startInteractSectorRange(t) {
    t.startObject(2);
  }
  static addBegin(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addEnd(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endInteractSectorRange(t) {
    return t.endObject();
  }
  static createInteractSectorRange(t, e, r) {
    return (
      InteractSectorRange.startInteractSectorRange(t),
      InteractSectorRange.addBegin(t, e),
      InteractSectorRange.addEnd(t, r),
      InteractSectorRange.endInteractSectorRange(t)
    );
  }
}
exports.InteractSectorRange = InteractSectorRange;
//# sourceMappingURL=interact-sector-range.js.map
