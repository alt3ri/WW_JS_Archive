"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorTurnToEntityData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToEntityData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorTurnToEntityData(t, r) {
    return (r || new ActorTurnToEntityData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorTurnToEntityData(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorTurnToEntityData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startActorTurnToEntityData(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endActorTurnToEntityData(t) {
    return t.endObject();
  }
  static createActorTurnToEntityData(t, r, a) {
    return (
      ActorTurnToEntityData.startActorTurnToEntityData(t),
      ActorTurnToEntityData.addType(t, r),
      ActorTurnToEntityData.addEntityId(t, a),
      ActorTurnToEntityData.endActorTurnToEntityData(t)
    );
  }
}
exports.ActorTurnToEntityData = ActorTurnToEntityData;
//# sourceMappingURL=actor-turn-to-entity-data.js.map
