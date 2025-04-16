"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HasEquippedVision = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HasEquippedVision {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, s) {
    return (this.bb_pos = i), (this.bb = s), this;
  }
  static getRootAsHasEquippedVision(i, s) {
    return (s || new HasEquippedVision()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsHasEquippedVision(i, s) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new HasEquippedVision()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, i) : void 0;
  }
  option(i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, i) : void 0;
  }
  static startHasEquippedVision(i) {
    i.startObject(2);
  }
  static addType(i, s) {
    i.addFieldOffset(0, s, 0);
  }
  static addOption(i, s) {
    i.addFieldOffset(1, s, 0);
  }
  static endHasEquippedVision(i) {
    return i.endObject();
  }
  static createHasEquippedVision(i, s, t) {
    return (
      HasEquippedVision.startHasEquippedVision(i),
      HasEquippedVision.addType(i, s),
      HasEquippedVision.addOption(i, t),
      HasEquippedVision.endHasEquippedVision(i)
    );
  }
}
exports.HasEquippedVision = HasEquippedVision;
//# sourceMappingURL=has-equipped-vision.js.map
