"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableSkillOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableSkillOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsDisableSkillOperation(i, t) {
    return (t || new DisableSkillOperation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsDisableSkillOperation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableSkillOperation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  displayMode(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  disableSkillWheel() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startDisableSkillOperation(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addDisplayMode(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addDisableSkillWheel(i, t) {
    i.addFieldInt8(2, +t, 0);
  }
  static endDisableSkillOperation(i) {
    return i.endObject();
  }
  static createDisableSkillOperation(i, t, e, s) {
    return (
      DisableSkillOperation.startDisableSkillOperation(i),
      DisableSkillOperation.addType(i, t),
      DisableSkillOperation.addDisplayMode(i, e),
      DisableSkillOperation.addDisableSkillWheel(i, s),
      DisableSkillOperation.endDisableSkillOperation(i)
    );
  }
}
exports.DisableSkillOperation = DisableSkillOperation;
//# sourceMappingURL=disable-skill-operation.js.map
