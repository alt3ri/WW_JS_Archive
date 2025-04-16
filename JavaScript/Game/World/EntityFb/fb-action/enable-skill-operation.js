"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableSkillOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSkillOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEnableSkillOperation(t, e) {
    return (e || new EnableSkillOperation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableSkillOperation(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EnableSkillOperation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startEnableSkillOperation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endEnableSkillOperation(t) {
    return t.endObject();
  }
  static createEnableSkillOperation(t, e) {
    return (
      EnableSkillOperation.startEnableSkillOperation(t),
      EnableSkillOperation.addType(t, e),
      EnableSkillOperation.endEnableSkillOperation(t)
    );
  }
}
exports.EnableSkillOperation = EnableSkillOperation;
//# sourceMappingURL=enable-skill-operation.js.map
