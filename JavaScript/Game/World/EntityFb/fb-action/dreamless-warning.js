"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamlessWarning = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DreamlessWarning {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, e) {
    return (this.bb_pos = s), (this.bb = e), this;
  }
  static getRootAsDreamlessWarning(s, e) {
    return (e || new DreamlessWarning()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsDreamlessWarning(s, e) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DreamlessWarning()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  type() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.readUint8(this.bb_pos + s) : 0;
  }
  warningText(s) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, s) : void 0;
  }
  static startDreamlessWarning(s) {
    s.startObject(2);
  }
  static addType(s, e) {
    s.addFieldInt8(0, e, 0);
  }
  static addWarningText(s, e) {
    s.addFieldOffset(1, e, 0);
  }
  static endDreamlessWarning(s) {
    return s.endObject();
  }
  static createDreamlessWarning(s, e, r) {
    return (
      DreamlessWarning.startDreamlessWarning(s),
      DreamlessWarning.addType(s, e),
      DreamlessWarning.addWarningText(s, r),
      DreamlessWarning.endDreamlessWarning(s)
    );
  }
}
exports.DreamlessWarning = DreamlessWarning;
//# sourceMappingURL=dreamless-warning.js.map
