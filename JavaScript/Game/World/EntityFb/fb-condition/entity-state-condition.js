"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityStateCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityStateCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityStateCondition(t, i) {
    return (i || new EntityStateCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityStateCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityStateCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startEntityStateCondition(t) {
    t.startObject(2);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endEntityStateCondition(t) {
    return t.endObject();
  }
  static createEntityStateCondition(t, i, n) {
    return (
      EntityStateCondition.startEntityStateCondition(t),
      EntityStateCondition.addEntityId(t, i),
      EntityStateCondition.addState(t, n),
      EntityStateCondition.endEntityStateCondition(t)
    );
  }
}
exports.EntityStateCondition = EntityStateCondition;
//# sourceMappingURL=entity-state-condition.js.map
