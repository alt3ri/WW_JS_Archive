"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HasUpgradableVision = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HasUpgradableVision {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, i) {
    return (this.bb_pos = s), (this.bb = i), this;
  }
  static getRootAsHasUpgradableVision(s, i) {
    return (i || new HasUpgradableVision()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsHasUpgradableVision(s, i) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HasUpgradableVision()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  type(s) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, s) : void 0;
  }
  option(s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, s) : void 0;
  }
  static startHasUpgradableVision(s) {
    s.startObject(2);
  }
  static addType(s, i) {
    s.addFieldOffset(0, i, 0);
  }
  static addOption(s, i) {
    s.addFieldOffset(1, i, 0);
  }
  static endHasUpgradableVision(s) {
    return s.endObject();
  }
  static createHasUpgradableVision(s, i, a) {
    return (
      HasUpgradableVision.startHasUpgradableVision(s),
      HasUpgradableVision.addType(s, i),
      HasUpgradableVision.addOption(s, a),
      HasUpgradableVision.endHasUpgradableVision(s)
    );
  }
}
exports.HasUpgradableVision = HasUpgradableVision;
//# sourceMappingURL=has-upgradable-vision.js.map
