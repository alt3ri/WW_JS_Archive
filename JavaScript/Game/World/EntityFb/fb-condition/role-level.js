"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_role_level_js_1 = require("../fb-condition/union-role-level.js");
class RoleLevel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRoleLevel(e, t) {
    return (t || new RoleLevel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRoleLevel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RoleLevel()).__init(e.readInt32(e.position()) + e.position(), e)
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  optionType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_role_level_js_1.UnionRoleLevel.NONE;
  }
  option(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startRoleLevel(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionType(e, t) {
    e.addFieldInt8(1, t, union_role_level_js_1.UnionRoleLevel.NONE);
  }
  static addOption(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endRoleLevel(e) {
    return e.endObject();
  }
  static createRoleLevel(e, t, i, l) {
    return (
      RoleLevel.startRoleLevel(e),
      RoleLevel.addType(e, t),
      RoleLevel.addOptionType(e, i),
      RoleLevel.addOption(e, l),
      RoleLevel.endRoleLevel(e)
    );
  }
}
exports.RoleLevel = RoleLevel;
//# sourceMappingURL=role-level.js.map
