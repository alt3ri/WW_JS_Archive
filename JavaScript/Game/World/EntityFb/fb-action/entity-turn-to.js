"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityTurnTo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_actor_turn_to_data_js_1 = require("../fb-action/union-actor-turn-to-data.js");
class EntityTurnTo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEntityTurnTo(t, r) {
    return (r || new EntityTurnTo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityTurnTo(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EntityTurnTo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_actor_turn_to_data_js_1.UnionActorTurnToData.NONE;
  }
  target(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startEntityTurnTo(t) {
    t.startObject(3);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTargetType(t, r) {
    t.addFieldInt8(
      1,
      r,
      union_actor_turn_to_data_js_1.UnionActorTurnToData.NONE,
    );
  }
  static addTarget(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endEntityTurnTo(t) {
    return t.endObject();
  }
  static createEntityTurnTo(t, r, i, n) {
    return (
      EntityTurnTo.startEntityTurnTo(t),
      EntityTurnTo.addEntityId(t, r),
      EntityTurnTo.addTargetType(t, i),
      EntityTurnTo.addTarget(t, n),
      EntityTurnTo.endEntityTurnTo(t)
    );
  }
}
exports.EntityTurnTo = EntityTurnTo;
//# sourceMappingURL=entity-turn-to.js.map
