"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetEntityPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetEntityPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsResetEntityPos(t, s) {
    return (s || new ResetEntityPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsResetEntityPos(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ResetEntityPos()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startResetEntityPos(t) {
    t.startObject(1);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static endResetEntityPos(t) {
    return t.endObject();
  }
  static createResetEntityPos(t, s) {
    return (
      ResetEntityPos.startResetEntityPos(t),
      ResetEntityPos.addEntityId(t, s),
      ResetEntityPos.endResetEntityPos(t)
    );
  }
}
exports.ResetEntityPos = ResetEntityPos;
//# sourceMappingURL=reset-entity-pos.js.map
