"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityAttachTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityAttachTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityAttachTarget(t, i) {
    return (i || new EntityAttachTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityAttachTarget(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityAttachTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  attachPoint(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startEntityAttachTarget(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addAttachPoint(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endEntityAttachTarget(t) {
    return t.endObject();
  }
  static createEntityAttachTarget(t, i, a, e) {
    return (
      EntityAttachTarget.startEntityAttachTarget(t),
      EntityAttachTarget.addType(t, i),
      EntityAttachTarget.addEntityId(t, a),
      EntityAttachTarget.addAttachPoint(t, e),
      EntityAttachTarget.endEntityAttachTarget(t)
    );
  }
}
exports.EntityAttachTarget = EntityAttachTarget;
//# sourceMappingURL=entity-attach-target.js.map
