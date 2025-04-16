"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityEventCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityEventCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityEventCondition(t, i) {
    return (i || new EntityEventCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityEventCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityEventCondition()).__init(
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
  isDead() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isLocked() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityEventCondition(t) {
    t.startObject(4);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIsDead(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addIsLocked(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endEntityEventCondition(t) {
    return t.endObject();
  }
  static createEntityEventCondition(t, i, n, e, s) {
    return (
      EntityEventCondition.startEntityEventCondition(t),
      EntityEventCondition.addEntityId(t, i),
      EntityEventCondition.addState(t, n),
      EntityEventCondition.addIsDead(t, e),
      EntityEventCondition.addIsLocked(t, s),
      EntityEventCondition.endEntityEventCondition(t)
    );
  }
}
exports.EntityEventCondition = EntityEventCondition;
//# sourceMappingURL=entity-event-condition.js.map
