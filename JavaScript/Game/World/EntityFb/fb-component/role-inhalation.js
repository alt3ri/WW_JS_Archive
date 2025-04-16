"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInhalation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RoleInhalation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRoleInhalation(t, e) {
    return (e || new RoleInhalation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRoleInhalation(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RoleInhalation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startRoleInhalation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endRoleInhalation(t) {
    return t.endObject();
  }
  static createRoleInhalation(t, e) {
    return (
      RoleInhalation.startRoleInhalation(t),
      RoleInhalation.addType(t, e),
      RoleInhalation.endRoleInhalation(t)
    );
  }
}
exports.RoleInhalation = RoleInhalation;
//# sourceMappingURL=role-inhalation.js.map
