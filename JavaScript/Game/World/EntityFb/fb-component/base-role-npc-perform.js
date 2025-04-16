"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseRoleNpcPerform = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BaseRoleNpcPerform {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsBaseRoleNpcPerform(e, r) {
    return (r || new BaseRoleNpcPerform()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsBaseRoleNpcPerform(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new BaseRoleNpcPerform()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  static startBaseRoleNpcPerform(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endBaseRoleNpcPerform(e) {
    return e.endObject();
  }
  static createBaseRoleNpcPerform(e, r) {
    return (
      BaseRoleNpcPerform.startBaseRoleNpcPerform(e),
      BaseRoleNpcPerform.addType(e, r),
      BaseRoleNpcPerform.endBaseRoleNpcPerform(e)
    );
  }
}
exports.BaseRoleNpcPerform = BaseRoleNpcPerform;
//# sourceMappingURL=base-role-npc-perform.js.map
