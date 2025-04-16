"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetMoveSpeed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetMoveSpeed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetMoveSpeed(e, t) {
    return (t || new SetMoveSpeed()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetMoveSpeed(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetMoveSpeed()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  speed() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startSetMoveSpeed(e) {
    e.startObject(1);
  }
  static addSpeed(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static endSetMoveSpeed(e) {
    return e.endObject();
  }
  static createSetMoveSpeed(e, t) {
    return (
      SetMoveSpeed.startSetMoveSpeed(e),
      SetMoveSpeed.addSpeed(e, t),
      SetMoveSpeed.endSetMoveSpeed(e)
    );
  }
}
exports.SetMoveSpeed = SetMoveSpeed;
//# sourceMappingURL=set-move-speed.js.map
