"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetForceLock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetForceLock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetForceLock(t, e) {
    return (e || new SetForceLock()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetForceLock(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetForceLock()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isLocked() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetForceLock(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsLocked(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endSetForceLock(t) {
    return t.endObject();
  }
  static createSetForceLock(t, e, r) {
    return (
      SetForceLock.startSetForceLock(t),
      SetForceLock.addEntityId(t, e),
      SetForceLock.addIsLocked(t, r),
      SetForceLock.endSetForceLock(t)
    );
  }
}
exports.SetForceLock = SetForceLock;
//# sourceMappingURL=set-force-lock.js.map
