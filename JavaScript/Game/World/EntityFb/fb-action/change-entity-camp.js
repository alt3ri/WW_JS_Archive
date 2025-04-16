"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeEntityCamp = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityCamp {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsChangeEntityCamp(t, a) {
    return (a || new ChangeEntityCamp()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeEntityCamp(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ChangeEntityCamp()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  targetEntity() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  camp() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startChangeEntityCamp(t) {
    t.startObject(2);
  }
  static addTargetEntity(t, a) {
    t.addFieldInt32(0, a, 0);
  }
  static addCamp(t, a) {
    t.addFieldInt8(1, a, 0);
  }
  static endChangeEntityCamp(t) {
    return t.endObject();
  }
  static createChangeEntityCamp(t, a, e) {
    return (
      ChangeEntityCamp.startChangeEntityCamp(t),
      ChangeEntityCamp.addTargetEntity(t, a),
      ChangeEntityCamp.addCamp(t, e),
      ChangeEntityCamp.endChangeEntityCamp(t)
    );
  }
}
exports.ChangeEntityCamp = ChangeEntityCamp;
//# sourceMappingURL=change-entity-camp.js.map
