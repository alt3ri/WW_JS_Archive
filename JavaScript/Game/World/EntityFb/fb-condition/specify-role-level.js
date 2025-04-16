"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecifyRoleLevel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpecifyRoleLevel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSpecifyRoleLevel(e, t) {
    return (t || new SpecifyRoleLevel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSpecifyRoleLevel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SpecifyRoleLevel()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  index() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  level() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startSpecifyRoleLevel(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endSpecifyRoleLevel(e) {
    return e.endObject();
  }
  static createSpecifyRoleLevel(e, t, i, s, l) {
    return (
      SpecifyRoleLevel.startSpecifyRoleLevel(e),
      SpecifyRoleLevel.addType(e, t),
      SpecifyRoleLevel.addIndex(e, i),
      SpecifyRoleLevel.addCompare(e, s),
      SpecifyRoleLevel.addLevel(e, l),
      SpecifyRoleLevel.endSpecifyRoleLevel(e)
    );
  }
}
exports.SpecifyRoleLevel = SpecifyRoleLevel;
//# sourceMappingURL=specify-role-level.js.map
