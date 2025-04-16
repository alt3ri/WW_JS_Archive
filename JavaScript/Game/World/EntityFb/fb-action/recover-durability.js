"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecoverDurability = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RecoverDurability {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRecoverDurability(t, e) {
    return (e || new RecoverDurability()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRecoverDurability(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RecoverDurability()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startRecoverDurability(t) {
    t.startObject(1);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endRecoverDurability(t) {
    return t.endObject();
  }
  static createRecoverDurability(t, e) {
    return (
      RecoverDurability.startRecoverDurability(t),
      RecoverDurability.addEntityId(t, e),
      RecoverDurability.endRecoverDurability(t)
    );
  }
}
exports.RecoverDurability = RecoverDurability;
//# sourceMappingURL=recover-durability.js.map
